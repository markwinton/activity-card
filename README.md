# Activity Card

https://markwinton.github.io/activity-card

A Strava activity visualizer

## Getting Started

Activity Card is made up of a static React frontend, an Express service and a Postgres database. 

To run the app locally:

1. Start a Postgres server with the tables below

2. Create a .env file in the app's root directory:

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

5. Open your browser to [localhost:8080](http://localhost:8080)

Learn more about the Strava API at [developers.strava.com](https://developers.strava.com)

## Service

### POST /auth/authorize/:authorizationCode

Add authorization

__parameters__

authorizationCode: OAuth 2.0 authorization code obtained from the Strava API

__json response__

```
{
  "token": <string>,
  "name": <string>
}
```

token: session token 

name: first name

### POST /auth/deauthorize

Remove authorization

__headers__

`"Authorization": "Bearer {session token}"`

### GET /api/v1/activities/:before/:after

Fetch activities 

__parameters__

before, after: unix timestamps for activities in range [after, before]

__headers__

`"Authorization": "Bearer {session token}"`

__json response__

```
{
  activities: [
    {
      "type": <integer>,
      "start": <integer>,
      "distance": <float>,
      "speed": <float>
    }
  ]
}
```
 
type: 0=normal, 1=workout, 2=race

start: start time as unix timestamp

distance: distance in meters

speed: average speed in meters per second

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
