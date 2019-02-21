# Activity Card

## routes

### POST /auth/authorize/:authorizationCode

Grant Activity Card access to a user's Strava data

#### parameters

`authorizationCode`: OAuth 2.0 authorization code obtained from the Strava API

#### response

```
{
  'token': <string>,
  'name': <string>
}
```

`token`: session token 

`name`: Strava user's first name

### POST /auth/deauthorize

Revoke Activity Card's access to a user's Strava data

#### headers

`"Authorization": "Bearer {session token}"`

### GET /api/v1/activities/:before/:after

Return a user's Strava activities 

#### parameters

`before`, `after`: unix timestamps for activities in range [`after`, `before`]

#### headers

`"Authorization": "Bearer {session token}"`

#### response

```
{
  activities: [
    {
      'type': <integer>,
      'start': <integer>,
      'distance': <float>,
      'speed': <float>
    }
  ]
}
```

`type`: `0`=normal, `1`=workout, `2`=race

`start`: start time as unix timestamp

`distance`: distance in meters

`speed`: average speed in meters per second

## .env

Strava oauth client id

`CLIENT_ID=123456`

Strava oauth client secret

`CLIENT_SECRET=1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a`

location of Strava brand images

`ASSETS_URL=https://bucket.s3.amazonaws.com`

service location

`SERVICE_URL=http://localhost:3000`

service port

`PORT=3000`

postgres location

`DATABASE_URL=postgress://localhost:5432`

Access-Control-Allow-Origin

`ALLOW_ORIGIN=http://localhost:8080 `

## postgres

```
CREATE TABLE limiters (
  identifier VARCHAR PRIMARY KEY CHECK (LENGTH(identifier) > 0),
  tokens INT NOT NULL CHECK (tokens >= 0),
  last_update TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE authorizations (
  session_token VARCHAR NOT NULL CHECK(session_token ~ '^[a-z0-9]+$'),
  access_token VARCHAR NOT NULL CHECK(access_token ~ '^[a-z0-9]+$'),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY(session_token, access_token)
);

INSERT INTO limiters VALUES ('strava.minute', 0, '-infinity');
INSERT INTO limiters VALUES ('strava.day', 0, '-infinity');
```
