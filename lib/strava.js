const requestPromise = require('request-promise-native');
const moment = require('moment');
const { ResourceError, AuthorizationError } = require('../error');

const type = (workoutType) => {
  switch (workoutType) {
    case 1: return 2;
    case 3: return 1;
    case 11: return 2;
    case 12: return 1;
    default: return 0;
  }
};

const request = (opts) => {
  const options = Object.create(opts);
  options.json = true;
  options.resolveWithFullResponse = true;
  return requestPromise(options)
    .then(response => response.body)
    .catch((response) => {
      if (response.statusCode === 401) {
        throw new AuthorizationError('strava api returned 401 - unauthorized');
      }
      throw new ResourceError(`strava api returned ${response.statusCode} - ${response.body}`);
    });
};

const authorize = authorizationCode => request({
  method: 'POST',
  uri: 'https://www.strava.com/oauth/token',
  qs: {
    grant_type: 'authorization_code',
    code: authorizationCode,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  },
})
  .then(authorization => ({
    accessToken: authorization.access_token,
    expiration: authorization.expires_at,
    name: authorization.athlete.firstname || '',
  }));

const deauthorize = accessToken => request({
  method: 'POST',
  uri: 'https://www.strava.com/oauth/deauthorize',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

const getActivities = (accessToken, before, after) => {
  const requestRecursive = (page, accumulator) => request({
    method: 'GET',
    uri: 'https://www.strava.com/api/v3/athlete/activities',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    qs: {
      before,
      after,
      page,
      per_page: 200,
    },
  })
    .then((activities) => {
      if (activities.length > 0) {
        accumulator.push(...activities);
        return requestRecursive(page + 1, accumulator);
      }
      return accumulator;
    });
  return requestRecursive(1, [])
    .then(accumulator => ({
      activities: accumulator.map(activity => ({
        type: type(activity.workout_type),
        start: moment(activity.start_date).unix(),
        distance: activity.distance,
        speed: activity.average_speed,
      })),
    }));
};

module.exports = { authorize, deauthorize, getActivities };
