const moment = require('moment')

const dispenseTokens = {}

dispenseTokens.day = ({tokens, last_update, now}) => {
  if (last_update.isBefore(now.startOf('day'))) {
    tokens = 30000
  }
  return tokens
}

dispenseTokens.minute = ({tokens, last_update, now}) => {
  if (last_update.isBefore(now.subtract(now.minute()%15, 'minutes').startOf('minute'))) {
    tokens = 600
  }
  return tokens
}

module.exports = class {
  
  constructor(pool) {
    this.pool = pool
  }
  
  consume() {
    return new Promise((resolve, reject) => {
      this.pool.connect()
        .then(client => 
          this.begin(client)
            .then(() => 
              this.consumeToken(client, 'strava.minute', dispenseTokens.minute)
            )
            .then(() => 
              this.consumeToken(client, 'strava.day', dispenseTokens.day)
            )
            .then(() => 
              this.commit(client)
            )
            .then(() =>
              resolve()     
            )
            .catch(() =>
              this.abort(client)
                .then(() => 
                  reject()
                )
            )
            .finally(() => 
              client.release()
            )
        )
    })
  }
  
  consumeToken(client, identifier, dispenseTokens) { 
    return this.selectForUpdate(client, identifier)
      .then(row => 
        dispenseTokens(row)
      )
      .then(tokens => 
        tokens - 1
      )
      .then(tokens => 
        this.update(client, identifier, tokens)
      )
  }
  
  begin(client) {
    return client.query('BEGIN')
  }
  
  commit(client) {
    return client.query('COMMIT')
  }
  
  abort(client) {
    return client.query('ABORT')
  }
  
  selectForUpdate(client, identifier) {
    return client.query(`SELECT tokens, last_update, NOW() AS now FROM limiters WHERE identifier='${identifier}' FOR UPDATE`)
      .then(results => 
        results.rows[0]
      )
      .then(row => {
        row.last_update = moment.utc(row.last_update)
        row.now = moment.utc(row.now)
        return row
      })
  }
  
  update(client, identifier, tokens) {
    return client.query(`UPDATE limiters SET tokens=${tokens}, last_update=NOW() WHERE identifier='${identifier}'`)
  }
  
}
