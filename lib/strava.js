const request = require('request-promise-native');
const moment = require('moment');
const { AuthorizationError } = require('../errors');

const type = (workoutType) => {
  switch (workoutType) {
    case 1: return 2;
    case 3: return 1;
    case 11: return 2;
    case 12: return 1;
    default: return 0;
  }
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
  json: true,
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
  const accumulator = [];
  const requestRecursive = page => request({
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
    resolveWithFullResponse: true,
    json: true,
  })
    .then((activities) => {
      if (activities.length > 0) {
        accumulator.push(...activities);
        return requestRecursive(page + 1);
      }
      return null;
    });
  return requestRecursive(1)
    .then(() => ({
      activities: accumulator.map(activity => ({
        type: type(activity.workout_type),
        start: moment(activity.start_date).unix(),
        distance: activity.distance,
        speed: activity.average_speed,
      })),
    }));
};

module.exports = { authorize, deauthorize, getActivities };
