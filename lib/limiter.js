const moment = require('moment');
const { ResourceError } = require('../error');

const dispenser = {};

dispenser.day = ({ tokens, lastUpdate, now }) => {
  if (lastUpdate.isBefore(now.startOf('day'))) {
    return 30000;
  }
  return tokens;
};

dispenser.minute = ({ tokens, lastUpdate, now }) => {
  if (lastUpdate.isBefore(now.subtract(now.minute() % 15, 'minutes').startOf('minute'))) {
    return 600;
  }
  return tokens;
};

const begin = client => client.query('BEGIN');

const commit = client => client.query('COMMIT');

const abort = client => client.query('ABORT');

const selectForUpdate = (client, identifier) => client.query(`SELECT tokens, last_update, NOW() AS now FROM limiters WHERE identifier='${identifier}' FOR UPDATE`)
  .then(results => results.rows[0])
  .then(row => ({
    tokens: row.tokens,
    lastUpdate: moment.utc(row.last_update),
    now: moment.utc(row.now),
  }));

const update = (client, identifier, tokens) => client.query(`UPDATE limiters SET tokens=${tokens}, last_update=NOW() WHERE identifier='${identifier}'`);

const consumeToken = (client, identifier, dispenseTokens) => selectForUpdate(client, identifier)
  .then(row => dispenseTokens(row))
  .then(tokens => tokens - 1)
  .then(tokens => update(client, identifier, tokens));

const consume = pool => pool.connect()
  .then(client => begin(client)
    .then(() => consumeToken(client, 'strava.minute', dispenser.minute))
    .then(() => consumeToken(client, 'strava.day', dispenser.day))
    .then(() => commit(client))
    .catch(() => abort(client)
      .then(() => { throw new ResourceError('strava api tokens exhausted'); }))
    .finally(() => client.release()));

module.exports = { consume };
