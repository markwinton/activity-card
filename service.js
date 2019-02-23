require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
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

app.post('/auth/authorize/:authorizationCode', (request, response) => {
  const { authorizationCode } = request.params;
  const pattern = /^[a-z0-9]+$/;
  if (pattern.test(authorizationCode)) {
    limiter.consume(pool)
      .then(() => strava.authorize(authorizationCode)
        .then(({ accessToken, expiration, name }) => auth.add(pool, accessToken, expiration)
          .then(sessionToken => response.status(200).json({
            token: sessionToken,
            name,
          })))
        .catch(() => response.status(401).json({ error: 'Unauthorized' })))
      .catch(() => response.status(503).json({ error: 'Service Unavailable' }));
  } else {
    response.status(400).json({ error: 'Bad Request' });
  }
});

const guard = (request, response, next) => {
  const authorizationHeader = request.get('Authorization') || '';
  const pattern = /^Bearer [a-z0-9]+$/;
  if (pattern.test(authorizationHeader)) {
    const sessionToken = authorizationHeader.substring(7);
    auth.accessToken(pool, sessionToken)
      .then((accessToken) => {
        request.accessToken = accessToken;
        next();
      })
      .catch(() => response.status(401).json({ error: 'Unauthorized' }));
  } else {
    response.status(400).json({ error: 'Bad Request' });
  }
};

app.use('/auth/deauthorize', guard);
app.post('/auth/deauthorize', (request, response) => {
  const { accessToken } = request;
  auth.remove(pool, accessToken)
    .then(() => limiter.consume(pool))
    .then(() => strava.deauthorize(accessToken))
    .finally(() => response.status(200).json({ status: 'Success' }));
});

app.use('/api/v1/activities/:before/:after', guard);
app.get('/api/v1/activities/:before/:after', (request, response) => {
  const { accessToken, params: { before, after } } = request;
  const pattern = /^[0-9]+$/;
  if (pattern.test(before) && pattern.test(after)) {
    limiter.consume(pool)
      .then(() => strava.getActivities(accessToken, before, after))
      .then(activities => response.status(200).json(activities))
      .catch(() => response.status(503).json({ error: 'Service Unavailable' }));
  } else {
    response.status(400).json({ error: 'Bad Request' });
  }
});

app.listen(process.env.PORT);

module.exports = app;
