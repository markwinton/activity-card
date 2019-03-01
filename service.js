require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { ServiceError } = require('./lib/error');
const auth = require('./lib/authorizations');
const limiter = require('./lib/limiter');
const strava = require('./lib/strava');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', () => {

});

const app = express();

app.use('/', (request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
  response.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  response.header('Access-Control-Allow-Headers', 'Authorization');
  if (request.method === 'OPTIONS') {
    response.status(200).end();
  } else {
    next();
  }
});

const sendErrorResponse = (error, response) => {
  console.log('ERROR: ' + error);
  
  if (error instanceof ServiceError) {
    if (error.message === 'api tokens exhausted') {
      response.status(503).json({ error: 'Service Unavailable' });
    } else if (error.message === 'session token unauthorized') {
      response.status(401).json({ error: 'Unauthorized' });
    } else if (error.message === 'access token unauthorized') {
      response.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

app.post('/auth/authorize/:authorizationCode', (request, response) => {
  const { authorizationCode } = request.params;
  const pattern = /^[a-z0-9]+$/;
  if (pattern.test(authorizationCode)) {
    limiter.consume(pool)
      .then(() => strava.authorize(authorizationCode))
      .then(({ accessToken, expiration, name }) => auth.add(pool, accessToken, expiration)
        .then(sessionToken => response.status(200).json({
          token: sessionToken,
          name,
        })))
      .catch(error => sendErrorResponse(error, response));
  } else {
    response.status(400).json({ error: 'Bad Request' });
  }
});

const guardSession = (request, response, next) => {
  const authorizationHeader = request.get('Authorization') || '';
  const pattern = /^Bearer [a-z0-9]+$/;
  if (pattern.test(authorizationHeader)) {
    const sessionToken = authorizationHeader.substring(7);
    auth.accessToken(pool, sessionToken)
      .then((accessToken) => {
        request.accessToken = accessToken;
        next();
      })
      .catch(error => sendErrorResponse(error, response));
  } else {
    response.status(400).json({ error: 'Bad Request' });
  }
};

app.use('/auth/deauthorize', guardSession);
app.post('/auth/deauthorize', (request, response) => {
  const { accessToken } = request;
  auth.remove(pool, accessToken)
    .then(() => limiter.consume(pool))
    .then(() => strava.deauthorize(accessToken))
    .then(() => response.status(200).json({ status: 'Success' }))
    .catch(error => sendErrorResponse(error, response));
});

app.use('/api/v1/activities/:before/:after', guardSession);
app.get('/api/v1/activities/:before/:after', (request, response) => {
  const { accessToken, params: { before, after } } = request;
  const pattern = /^[0-9]+$/;
  if (pattern.test(before) && pattern.test(after)) {
    limiter.consume(pool)
      .then(() => strava.getActivities(accessToken, before, after))
      .then(activities => response.status(200).json(activities))
      .catch(error => sendErrorResponse(error, response));
  } else {
    response.status(400).json({ error: 'Bad Request' });
  }
});

app.listen(process.env.PORT);

module.exports = app;
