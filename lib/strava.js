const request = require('request-promise-native')
const moment = require('moment')

const authorize = authorizationCode => ({
  method: 'POST',
  uri: 'https://www.strava.com/oauth/token',
  qs: {
    'grant_type': 'authorization_code',
    'code': authorizationCode,
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
  }
})

const deauthorize = accessToken => ({
  method: 'POST',
  uri: 'https://www.strava.com/oauth/deauthorize',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  }
})

const getActivities = (accessToken, before, after, page) => ({
  method: 'GET',
  uri: 'https://www.strava.com/api/v3/athlete/activities',
  headers: {
    'Authorization': 'Bearer ' + accessToken
  },
  qs: {
    'before': before,
    'after': after,
    'page': page,
    'per_page': 200
  }
})

const type = workoutType => {
  switch(workoutType) {
    case 1: return 2
    case 3: return 1
    default: return 0
  }
}

module.exports = class {

  authorize(authorizationCode) {
    return new Promise((resolve, reject) => {
      request(authorize(authorizationCode))
        .then(JSON.parse)
        .then(authorization => 
          resolve({
            'accessToken': authorization.access_token,
            'accessTokenExpiration': authorization.expires_at,
            'name': authorization.athlete.firstname || ''
          })
        )
        .catch(() => 
          reject()      
        )
    })
  }

  deauthorize(accessToken) {
    return new Promise((resolve, reject) => {
      request(deauthorize(accessToken))
        .then(() =>
          resolve()
        )
        .catch(() => 
          reject()
        )
    })
  }

  getActivities(accessToken, before, after) {
    return new Promise((resolve, reject) => {
      const accumulator = []
      const requestRecursive = page => {
        return request(getActivities(accessToken, before, after, page))
          .then(JSON.parse)
          .then(activities => { 
            if (activities.length > 0) {
              accumulator.push(...activities)
              return requestRecursive(page + 1)
            }
          })
      }
      requestRecursive(1)
        .then(() => 
          resolve({
            'activities': accumulator.map(activity => ({
              'type': type(activity.workout_type),
              'start': moment(activity.start_date).unix(),
              'distance': activity.distance,
              'speed': activity.average_speed
            }))
          })
        )
        .catch(() => 
          reject()
        )
    })
  }

}
