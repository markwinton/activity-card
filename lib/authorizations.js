const crypto = require('crypto')

module.exports = class {
  
  constructor(pool) {
    this.pool = pool
  }
  
  add(accessToken, expiration) {
    return new Promise((resolve, reject) => {
      const sessionToken = crypto.randomBytes(32).toString('hex')
      this.pool.connect()
        .then(client => 
          client.query(`INSERT INTO authorizations VALUES ('${sessionToken}', '${accessToken}', TO_TIMESTAMP(${expiration}))`)
            .then(() => 
              resolve(sessionToken)
            )
            .catch(() =>
              reject()      
            )
            .finally(() => 
              client.release()
            )
        )
    })
  }
  
  remove(accessToken) {
    return new Promise((resolve, reject) => {
      this.pool.connect()
        .then(client => 
          client.query(`DELETE FROM authorizations WHERE access_token='${accessToken}'`)
            .then(() =>
              resolve()     
            )
            .catch(() =>
              reject()      
            )
            .finally(() => 
              client.release()
            )
        )
    })
  }

  accessToken(sessionToken) {
    return new Promise((resolve, reject) => {
      this.pool.connect()
        .then(client => 
          client.query(`SELECT access_token FROM authorizations WHERE session_token='${sessionToken}' AND expires_at > NOW()`)
            .then(results => 
              resolve(results.rows[0].access_token)
            )
            .catch(() =>
              reject()      
            )
            .finally(() => 
              client.release()
            )
        )
    })
  }
  
}
