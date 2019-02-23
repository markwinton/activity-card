const crypto = require('crypto');

const add = (pool, accessToken, expiration) => new Promise((resolve, reject) => {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  pool.connect()
    .then(client => client.query(`INSERT INTO authorizations VALUES ('${sessionToken}', '${accessToken}', TO_TIMESTAMP(${expiration}))`)
      .then(() => resolve(sessionToken))
      .catch(() => reject())
      .finally(() => client.release()));
});

const remove = (pool, accessToken) => new Promise((resolve, reject) => {
  pool.connect()
    .then(client => client.query(`DELETE FROM authorizations WHERE access_token='${accessToken}'`)
      .then(() => resolve())
      .catch(() => reject())
      .finally(() => client.release()));
});

const accessToken = (pool, sessionToken) => new Promise((resolve, reject) => {
  pool.connect()
    .then(client => client.query(`SELECT access_token FROM authorizations WHERE session_token='${sessionToken}' AND expires_at > NOW()`)
      .then(results => resolve(results.rows[0].access_token))
      .catch(() => reject())
      .finally(() => client.release()));
});

module.exports = { add, remove, accessToken };
