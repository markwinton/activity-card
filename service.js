require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const { InputError, AuthorizationError, ResourceError } = require('./error');
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

const validate = (string, pattern) => new Promise((resolve, reject) => {
  if (pattern.test(string)) {
    resolve(string);
  }
  reject(new InputError(`${string} does not match pattern ${pattern}`));
});

const sendErrorResponse = (error, response) => {
  if (error instanceof InputError) {
    response.status(400).json({ error: 'Bad Request' });
  } else if (error instanceof AuthorizationError) {
    response.status(401).json({ error: 'Unauthorized' });
  } else if (error instanceof ResourceError) {
    response.status(503).json({ error: 'Service Unavailable' });
  } else {
    response.status(500).json({ error: 'Internal Server Error' });
  }
};

app.post('/auth/authorize/:authorizationCode', (request, response) => {
  const { authorizationCode } = request.params;
  validate(authorizationCode, /^[a-z0-9]+$/)
    .then(() => limiter.consume(pool))
    .then(() => strava.authorize(authorizationCode))
    .then(({ accessToken, expiration, name }) => auth.add(pool, accessToken, expiration)
      .then(sessionToken => response.status(200).json({
        token: sessionToken,
        name,
      })))
    .catch(error => sendErrorResponse(error, response));
});

const guardSession = (request, response, next) => {
  const authorizationHeader = request.get('Authorization') || '';
  validate(authorizationHeader, /^Bearer [a-z0-9]+$/)
    .then(header => header.substring(7))
    .then(sessionToken => auth.accessToken(pool, sessionToken))
    .then((accessToken) => {
      request.accessToken = accessToken;
      next();
    })
    .catch(error => sendErrorResponse(error, response));
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
  validate(before, /^[0-9]+$/)
    .then(() => validate(after, /^[0-9]+$/))
    .then(() => limiter.consume(pool))
    .then(() => strava.getActivities(accessToken, before, after))
    .then(activities => response.status(200).json(activities))
    .catch(error => sendErrorResponse(error, response));
});

app.get('/api/v1/activities/random', (request, response) => {
  const activities = strava.getRandomActivities(200);
  response.status(200).json(activities);
});

app.listen(process.env.PORT);

module.exports = app;
