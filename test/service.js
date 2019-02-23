const { Pool } = require('pg');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const crypto = require('crypto');
const moment = require('moment');
const app = require('../service');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

chai.use(chaiHttp);

function updateLimiter(identifier, tokens) {
  return pool.connect()
    .then(client => client.query(`UPDATE limiters SET tokens=${tokens}, last_update=NOW() WHERE identifier='${identifier}'`)
      .finally(() => client.release()));
}

function updateAuthorization(sessionToken, expiration) {
  return pool.connect()
    .then(client => client.query(`UPDATE authorizations SET expires_at=TO_TIMESTAMP(${expiration}) WHERE session_token='${sessionToken}'`)
      .finally(() => client.release()));
}

function deleteAuthorizations() {
  return pool.connect()
    .then(client => client.query('DELETE FROM authorizations')
      .finally(() => client.release()));
}

function createSuccessfulTokenExchangeInterceptor(expiration) {
  nock('https://www.strava.com')
    .post('/oauth/token')
    .query({
      grant_type: 'authorization_code',
      code: /^[a-z0-9]+$/,
      client_id: /^[0-9]+$/,
      client_secret: /^[a-z0-9]+$/,
    })
    .reply(200, {
      token_type: 'Bearer',
      access_token: crypto.randomBytes(32).toString('hex'),
      refresh_token: crypto.randomBytes(32).toString('hex'),
      expires_at: expiration,
      athlete: { firstname: 'Bob' },
      state: 'STRAVA',
    });
}

function createUnsuccessfulTokenExchangeInterceptor() {
  nock('https://www.strava.com')
    .post('/oauth/token')
    .query({
      grant_type: 'authorization_code',
      code: /^[a-z0-9]+$/,
      client_id: /^[0-9]+$/,
      client_secret: /^[a-z0-9]+$/,
    })
    .reply(401);
}

function createDeauthorizationInterceptor() {
  nock('https://www.strava.com', { reqheaders: { Authorization: /^Bearer [a-z0-9]+$/ } })
    .post('/oauth/deauthorize')
    .reply(200);
}

function createActivityRequestInterceptor(count) {
  nock('https://www.strava.com', { reqheaders: { Authorization: /^Bearer [a-z0-9]+$/ } })
    .get('/api/v3/athlete/activities')
    .query({
      before: /^[0-9]+$/,
      after: /^[0-9]+$/,
      page: /^[0-9]+$/,
      per_page: /^[0-9]+$/,
    })
    .reply(200, Array(count).fill({
      resource_state: 2,
      athlete: {
        id: 134815,
        resource_state: 1,
      },
      name: 'Happy Friday',
      distance: 24931.4,
      moving_time: 4500,
      elapsed_time: 4500,
      total_elevation_gain: 0,
      type: 'Ride',
      workout_type: null,
      id: 154504250376823,
      external_id: 'garmin_push_12345678987654321',
      upload_id: 987654321234567891234,
      start_date: '2018-05-02T12:15:09Z',
      start_date_local: '2018-05-02T05:15:09Z',
      timezone: '(GMT-08:00) America/Los_Angeles',
      utc_offset: -25200,
      start_latlng: null,
      end_latlng: null,
      location_city: null,
      location_state: null,
      location_country: 'United States',
      start_latitude: null,
      start_longitude: null,
      achievement_count: 0,
      kudos_count: 3,
      comment_count: 1,
      athlete_count: 1,
      photo_count: 0,
      map: {
        id: 'a12345678987654321',
        summary_polyline: null,
        resource_state: 2,
      },
      trainer: true,
      commute: false,
      manual: false,
      private: false,
      flagged: false,
      gear_id: 'b12345678987654321',
      from_accepted_tag: false,
      average_speed: 5.54,
      max_speed: 11,
      average_cadence: 67.1,
      average_watts: 175.3,
      weighted_average_watts: 210,
      kilojoules: 788.7,
      device_watts: true,
      has_heartrate: true,
      average_heartrate: 140.3,
      max_heartrate: 178,
      max_watts: 406,
      pr_count: 0,
      total_photo_count: 1,
      has_kudoed: false,
      suffer_score: 82,
    }));
}

describe('service', () => {
  beforeEach(() => deleteAuthorizations()
    .then(() => updateLimiter('strava.day', 100))
    .then(() => updateLimiter('strava.minute', 100)));

  afterEach(() => {
    chai.assert(nock.isDone());
  });

  describe('authorization route', () => {
    describe('/auth/authorize/:authorizationCode', () => {
      it('should return 400 with bad authorization code', () => chai.request(app)
        .post('/auth/authorize/<hello>')
        .then((response) => {
          chai.expect(response).to.have.status(400);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Bad Request');
        }));

      it('should return 401 with invalid authorization code', () => {
        createUnsuccessfulTokenExchangeInterceptor();

        return chai.request(app)
          .post('/auth/authorize/1376438746283746516514134')
          .then((response) => {
            chai.expect(response).to.have.status(401);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['error']);
            chai.expect(response.body.error).to.equal('Unauthorized');
          });
      });

      it('should return 200 with valid authorization code', () => {
        createSuccessfulTokenExchangeInterceptor(moment().add(1, 'hour').unix());

        return chai.request(app)
          .post('/auth/authorize/1376438746283746516514134')
          .then((response) => {
            chai.expect(response).to.have.status(200);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['token', 'name']);
            chai.expect(response.body.token).to.be.a('string');
            chai.expect(response.body.name).to.be.a('string');
          });
      });

      it('should return 503 with no day tokens', () => updateLimiter('strava.day', 0)
        .then(() => chai.request(app)
          .post('/auth/authorize/1376438746283746516514134')
          .then((response) => {
            chai.expect(response).to.have.status(503);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['error']);
            chai.expect(response.body.error).to.equal('Service Unavailable');
          })));

      it('should return 503 with no minute tokens', () => updateLimiter('strava.minute', 0)
        .then(() => chai.request(app)
          .post('/auth/authorize/1376438746283746516514134')
          .then((response) => {
            chai.expect(response).to.have.status(503);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['error']);
            chai.expect(response.body.error).to.equal('Service Unavailable');
          })));
    });
  });

  describe('protected routes', () => {
    let sessionToken = null;

    beforeEach(() => {
      createSuccessfulTokenExchangeInterceptor(moment().add(1, 'hour').unix());

      return chai.request(app)
        .post('/auth/authorize/1376438746283746516514134')
        .then((response) => {
          sessionToken = response.body.token;
        });
    });

    afterEach(() => {
      sessionToken = null;
    });

    describe('/auth/deauthorize', () => {
      it('should return 400 with missing authorization header', () => chai.request(app)
        .post('/auth/deauthorize')
        .then((response) => {
          chai.expect(response).to.have.status(400);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Bad Request');
        }));

      it('should return 400 with bad authorization header', () => chai.request(app)
        .post('/auth/deauthorize')
        .set('Authorization', '<hello>')
        .then((response) => {
          chai.expect(response).to.have.status(400);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Bad Request');
        }));

      it('should return 401 with invalid session token', () => chai.request(app)
        .post('/auth/deauthorize')
        .set('Authorization', 'Bearer 0000000000000000000000')
        .then((response) => {
          chai.expect(response).to.have.status(401);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Unauthorized');
        }));

      it('should return 401 with expired session token', () => updateAuthorization(sessionToken, moment().subtract(1, 'second').unix())
        .then(() => chai.request(app)
          .post('/auth/deauthorize')
          .set('Authorization', `Bearer ${sessionToken}`)
          .then((response) => {
            chai.expect(response).to.have.status(401);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['error']);
            chai.expect(response.body.error).to.equal('Unauthorized');
          })));

      it('should return 200 and revoke authorization with valid authorization header', () => {
        createDeauthorizationInterceptor();

        return chai.request(app)
          .post('/auth/deauthorize')
          .set('Authorization', `Bearer ${sessionToken}`)
          .then((response1) => {
            chai.expect(response1).to.have.status(200);
            chai.expect(response1).to.be.json;
            chai.expect(response1.body).to.have.keys(['status']);
            chai.expect(response1.body.status).to.equal('Success');
            chai.request(app)
              .post('/auth/deauthorize')
              .set('Authorization', `Bearer ${sessionToken}`)
              .then((response2) => {
                chai.expect(response2).to.have.status(401);
                chai.expect(response2).to.be.json;
                chai.expect(response2.body).to.have.keys(['error']);
                chai.expect(response2.body.error).to.equal('Unauthorized');
              });
          });
      });
    });

    describe('/api/v1/activities/:before/:after', () => {
      it('should return 400 with missing authorization header', () => chai.request(app)
        .get('/api/v1/activities/1549647925/1549647925')
        .then((response) => {
          chai.expect(response).to.have.status(400);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Bad Request');
        }));

      it('should return 400 with bad authorization header', () => chai.request(app)
        .get('/api/v1/activities/1549647925/1549647925')
        .set('Authorization', '<hello>')
        .then((response) => {
          chai.expect(response).to.have.status(400);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Bad Request');
        }));

      it('should return 401 with invalid session token', () => chai.request(app)
        .get('/api/v1/activities/1549647925/1549647925')
        .set('Authorization', 'Bearer 0000000000000000000000')
        .then((response) => {
          chai.expect(response).to.have.status(401);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Unauthorized');
        }));

      it('should return 401 with expired session token', () => updateAuthorization(sessionToken, moment().subtract(1, 'second').unix())
        .then(() => chai.request(app)
          .post('/api/v1/activities/1549647925/1549647925')
          .set('Authorization', `Bearer ${sessionToken}`)
          .then((response) => {
            chai.expect(response).to.have.status(401);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['error']);
            chai.expect(response.body.error).to.equal('Unauthorized');
          })));

      it('should return 400 wth bad before timestamp', () => chai.request(app)
        .get('/api/v1/activities/abcd/1549647925')
        .set('Authorization', `Bearer ${sessionToken}`)
        .then((response) => {
          chai.expect(response).to.have.status(400);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Bad Request');
        }));

      it('should return 400 with bad after timestamp', () => chai.request(app)
        .get('/api/v1/activities/1549647925/abcd')
        .set('Authorization', `Bearer ${sessionToken}`)
        .then((response) => {
          chai.expect(response).to.have.status(400);
          chai.expect(response).to.be.json;
          chai.expect(response.body).to.have.keys(['error']);
          chai.expect(response.body.error).to.equal('Bad Request');
        }));

      it('should return 200 with valid timestamps', () => {
        createActivityRequestInterceptor(10);
        createActivityRequestInterceptor(10);
        createActivityRequestInterceptor(0);

        return chai.request(app)
          .get('/api/v1/activities/1549647925/1549647925')
          .set('Authorization', `Bearer ${sessionToken}`)
          .then((response) => {
            chai.expect(response).to.have.status(200);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['activities']);
            chai.expect(response.body.activities).to.have.lengthOf(20);
            response.body.activities.forEach((activity) => {
              chai.expect(activity).to.have.keys(['type', 'start', 'distance', 'speed']);
              chai.expect(activity.type).to.be.a('number');
              chai.expect(activity.start).to.be.a('number');
              chai.expect(activity.distance).to.be.a('number');
              chai.expect(activity.speed).to.be.a('number');
            });
          });
      });

      it('should return 503 with no day tokens', () => updateLimiter('strava.day', 0)
        .then(() => chai.request(app)
          .get('/api/v1/activities/1549647925/1549647925')
          .set('Authorization', `Bearer ${sessionToken}`)
          .then((response) => {
            chai.expect(response).to.have.status(503);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['error']);
            chai.expect(response.body.error).to.equal('Service Unavailable');
          })));

      it('should return 503 with no minute tokens', () => updateLimiter('strava.minute', 0)
        .then(() => chai.request(app)
          .get('/api/v1/activities/1549647925/1549647925')
          .set('Authorization', `Bearer ${sessionToken}`)
          .then((response) => {
            chai.expect(response).to.have.status(503);
            chai.expect(response).to.be.json;
            chai.expect(response.body).to.have.keys(['error']);
            chai.expect(response.body.error).to.equal('Service Unavailable');
          })));
    });
  });
});
