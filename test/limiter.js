const chai = require('chai');
const moment = require('moment');
const { Pool } = require('pg');
const { ResourceError } = require('../error');
const limiter = require('../lib/limiter');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function updateLimiter(identifier, tokens, lastUpdate) {
  return pool.connect()
    .then(client => client.query(`UPDATE limiters SET tokens=${tokens}, last_update=TO_TIMESTAMP(${lastUpdate}) WHERE identifier='${identifier}'`)
      .finally(() => client.release()));
}

function selectTokens(identifier) {
  return pool.connect()
    .then(client => client.query(`SELECT tokens FROM limiters WHERE identifier='${identifier}'`)
      .then(results => results.rows[0])
      .then(row => row.tokens)
      .finally(() => client.release()));
}

describe('limiter', () => {
  it('should consume one of each token and resolve', () => updateLimiter('strava.day', 30000, moment().unix())
    .then(() => updateLimiter('strava.minute', 600, moment().unix()))
    .then(() => limiter.consume(pool))
    .then(() => selectTokens('strava.day'))
    .then(tokens => chai.expect(tokens).to.equal(29999))
    .then(() => selectTokens('strava.minute'))
    .then(tokens => chai.expect(tokens).to.equal(599)));

  it('should reject if day tokens exhausted', () => updateLimiter('strava.day', 0, moment().unix())
    .then(() => updateLimiter('strava.minute', 600, moment().unix()))
    .then(() => limiter.consume(pool))
    .catch(error => error)
    .then(error => chai.expect(error).to.be.instanceof(ResourceError))
    .then(() => selectTokens('strava.day'))
    .then(tokens => chai.expect(tokens).to.equal(0))
    .then(() => selectTokens('strava.minute'))
    .then(tokens => chai.expect(tokens).to.equal(600)));

  it('should reject if minute tokens exhausted', () => updateLimiter('strava.day', 30000, moment().unix())
    .then(() => updateLimiter('strava.minute', 0, moment().unix()))
    .then(() => limiter.consume(pool))
    .catch(error => error)
    .then(error => chai.expect(error).to.be.instanceof(ResourceError))
    .then(() => selectTokens('strava.day'))
    .then(tokens => chai.expect(tokens).to.equal(30000))
    .then(() => selectTokens('strava.minute'))
    .then(tokens => chai.expect(tokens).to.equal(0)));

  it('should reject if all tokens exhausted', () => updateLimiter('strava.day', 0, moment().unix())
    .then(() => updateLimiter('strava.minute', 0, moment().unix()))
    .then(() => limiter.consume(pool))
    .catch(error => error)
    .then(error => chai.expect(error).to.be.instanceof(ResourceError))
    .then(() => selectTokens('strava.day'))
    .then(tokens => chai.expect(tokens).to.equal(0))
    .then(() => selectTokens('strava.minute'))
    .then(tokens => chai.expect(tokens).to.equal(0)));

  it('should refill tokens at midnight utc', () => {
    const timestamp = moment.utc().startOf('day').subtract(1, 'second').unix();

    return updateLimiter('strava.day', 0, timestamp)
      .then(() => updateLimiter('strava.minute', 0, timestamp))
      .then(() => limiter.consume(pool))
      .then(() => selectTokens('strava.day'))
      .then(tokens => chai.expect(tokens).to.equal(29999))
      .then(() => selectTokens('strava.minute'))
      .then(tokens => chai.expect(tokens).to.equal(599));
  });

  it('should refill minute tokens at 0, 15, 30 and 45 minutes after the hour', () => {
    const now = moment();
    const timestamp = now.subtract(now.minute() % 15, 'minutes').startOf('minute').subtract(1, 'second').unix();

    return updateLimiter('strava.day', 30000, timestamp)
      .then(() => updateLimiter('strava.minute', 0, timestamp))
      .then(() => limiter.consume(pool))
      .then(() => selectTokens('strava.day'))
      .then(tokens => chai.expect(tokens).to.equal(29999))
      .then(() => selectTokens('strava.minute'))
      .then(tokens => chai.expect(tokens).to.equal(599));
  });
});
