# Activity Card

https://markwinton.github.io/activity-card

A three.js Strava activity visualizer

## Getting Started

Activity Card is made up of a static React frontend, an Express service and a Postgres database. Follow these steps to run the app locally:

1. Start a Postgres server with the tables below

2. Create a `.env` file in the root directory of the repo with

```
CLIENT_ID={strava oauth client id}
CLIENT_SECRET={strava oauth client secret}
DATABASE_URL=postgress://localhost:5432
ALLOW_ORIGIN=http://localhost:8080
SERVICE_URL=http://localhost:3000
PORT=3000
```

3. Run `npm install` to install dependencies

4. Run `npm run start` to start the service and webpack-dev-server

Learn more about the Strava API at [developers.strava.com](https://developers.strava.com)

## Service

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

## Postgres

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
