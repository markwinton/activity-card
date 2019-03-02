const crypto = require('crypto');
const { AuthorizationError } = require('../errors');

const add = (pool, accessToken, expiration) => {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  return pool.connect()
    .then(client => client.query(`INSERT INTO authorizations VALUES ('${sessionToken}', '${accessToken}', TO_TIMESTAMP(${expiration}))`)
      .then(() => sessionToken)
      .finally(() => client.release()));
};

const remove = (pool, accessToken) => pool.connect()
  .then(client => client.query(`DELETE FROM authorizations WHERE access_token='${accessToken}'`)
    .finally(() => client.release()));

const accessToken = (pool, sessionToken) => pool.connect()
  .then(client => client.query(`SELECT access_token FROM authorizations WHERE session_token='${sessionToken}' AND expires_at > NOW()`)
    .then((results) => {
      if (results.rows.length > 0) {
        return results.rows[0].access_token;
      }
      throw new AuthorizationError('no valid access token found for session token');
    })
    .finally(() => client.release()));

module.exports = { add, remove, accessToken };
