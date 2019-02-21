# Activity Card Service

## Authorization

### POST /auth/authorize/:authorizationCode

Grant Activity Card access to a user's Strava data

#### parameters

`authorizationCode`: OAuth2.0 authorization code obtained from Strava API

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

## API

### GET /api/v1/activities/:before/:after

Return a user's Strava activities 

#### parameters

`before`, `after`: UTC unix timestamps for activities in range [`after`, `before`] exclusive

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

`start`: start time as UTC unix timestamp

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
