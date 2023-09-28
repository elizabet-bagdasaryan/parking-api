# Parking API

## Summary

This Restful API uses following technologies:

- **Express.js** - for bulding the backend server
- **Firebase** - for authentication, managing users and password resetting
- **PostgreSQL** - as a database
- **Docker-compose** - for creating and running PostgreSQL database and the API in containers
- **Express validator** - for validating request bodies

## Installation

To run this project in Docker, follow these installation instructions:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/elizabet-bagdasaryan/parking-api.git
   cd parking-api
   ```

2. **Create docker containers & start the project:**

   ```bash
   docker-compose up
   ```

3. **Now the app is running on this url:**
   [http://localhost:8080](http://localhost:8080)

## Endpoints

All endpoints that need authentication should get `user_token` header with the token generated when registering and loging in.

### Endpoint 1: Register a user

**Description:**
Creates a user and returns token

**HTTP Method:**
POST

**Endpoint URL:**
`/api/user/register`

**Request Body :**

```json
{
  "name": "Name",
  "email": "name@gmail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkNWM1ZTlmNTdjOWI2NDYzYzg1ODQ1YTA4OTlhOWQ0MTI5MmM4YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3dlZWZ0LWFwaSIsImF1ZCI6InN3ZWVmdC1hcGkiLCJhdXRoX3RpbWUiOjE2OTU5Mjk4MzIsInVzZXJfaWQiOiJlckN1aUwwYnp3U3RReExzT0FMdVdnUWdMcWIyIiwic3ViIjoiZXJDdWlMMGJ6d1N0UXhMc09BTHVXZ1FnTHFiMiIsImlhdCI6MTY5NTkyOTgzMiwiZXhwIjoxNjk1OTMzNDMyLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.lC1hA9lBpO1dCpQiX1fBbe_EpPuU0Gk4ybfB8nYwrZG-RaIzwyHdFTtTux6BGNNbC2zi3KE5GeZeMtavJoJ5LpJFpBvTIkH81fNNCw72xwlSwSinatFkld_K2Ih8CIctMvfC_O6Kk_SkekdPXxh1cMaowR7b9sCztg9VE98YiSv4zn5jJ0McOvAxSRE_CU6q8z5gcK9d23UEpTbz8l6yU3shkyJCimDa9Pe0Pwd9eqSRaxjzOjlzGKP-j0omzG1YBYKVdXzX--QlV9RTyPXEMsVqbvGmdDpDE_80oTEdfjUYW3J8y_Jw88f3R2RAWuuL4YRQ8CcF2PKGHYGq9_44hw"
  }
}
```

### Endpoint 2: Login

**Description:**
Returns user access token

**HTTP Method:**
POST

**Endpoint URL:**
`/api/user/login`

**Request Body:**

```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkNWM1ZTlmNTdjOWI2NDYzYzg1ODQ1YTA4OTlhOWQ0MTI5MmM4YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3dlZWZ0LWFwaSIsImF1ZCI6InN3ZWVmdC1hcGkiLCJhdXRoX3RpbWUiOjE2OTU5Mjk4MzIsInVzZXJfaWQiOiJlckN1aUwwYnp3U3RReExzT0FMdVdnUWdMcWIyIiwic3ViIjoiZXJDdWlMMGJ6d1N0UXhMc09BTHVXZ1FnTHFiMiIsImlhdCI6MTY5NTkyOTgzMiwiZXhwIjoxNjk1OTMzNDMyLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.lC1hA9lBpO1dCpQiX1fBbe_EpPuU0Gk4ybfB8nYwrZG-RaIzwyHdFTtTux6BGNNbC2zi3KE5GeZeMtavJoJ5LpJFpBvTIkH81fNNCw72xwlSwSinatFkld_K2Ih8CIctMvfC_O6Kk_SkekdPXxh1cMaowR7b9sCztg9VE98YiSv4zn5jJ0McOvAxSRE_CU6q8z5gcK9d23UEpTbz8l6yU3shkyJCimDa9Pe0Pwd9eqSRaxjzOjlzGKP-j0omzG1YBYKVdXzX--QlV9RTyPXEMsVqbvGmdDpDE_80oTEdfjUYW3J8y_Jw88f3R2RAWuuL4YRQ8CcF2PKGHYGq9_44hw"
  }
}
```

### Endpoint 3: Reset password

**Description:**
Sends an email to the user from where he can change his password

**HTTP Method:**
POST

**Endpoint URL:**
`/api/user/reset-password`

**Request Body:**

```json
{
  "email": "user@gmail.com"
}
```

**Response:**

```json
{
  "status": "success",
  "data": "Check your email"
}
```

### Endpoint 4: Create parking zone

**Description:**
Using this endpoint admin user creates parking zones

**HTTP Method:**
POST

**Endpoint URL:**
`/api/admin/parking-zone`

**Request Body:**

```json
{
  "name": "Zone",
  "address": "Zone",
  "rate": 15 // Amount of ₾ per hour
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Zone",
    "address": "Zone",
    "rate": 15,
    "updatedAt": "2023-09-28T19:25:14.164Z",
    "createdAt": "2023-09-28T19:25:14.164Z"
  }
}
```

### Endpoint 5: Get parking history of all users

**Description:**
Using this endpoint admin user gets history of parking of all users

**HTTP Method:**
GET

**Endpoint URL:**
`/api/admin/parking-history`

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "isParked": false,
      "createdAt": "2023-09-28T19:25:24.221Z",
      "updatedAt": "2023-09-28T19:25:29.806Z",
      "ParkingZoneId": 1,
      "CarId": 1
    }
  ]
}
```

### Endpoint 6: Add car to a user

**Description:**
Endport for creating user cars

**HTTP Method:**
POST

**Endpoint URL:**
`/api/user/add-car`

**Request Body:**

```json
{
  "brand": "BMW",
  "number": "sw-423-fe",
  "type": "jeep",
  "year": 2020
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "brand": "BMW",
    "number": "sw-423-fe",
    "type": "jeep",
    "year": "2020",
    "UserId": 1,
    "updatedAt": "2023-09-28T19:25:19.335Z",
    "createdAt": "2023-09-28T19:25:19.335Z"
  }
}
```

### Endpoint 7: Park car

**Description:**
Using this endpoint user can park his car on a specific parking zone

**HTTP Method:**
POST

**Endpoint URL:**
`/api/user/park-car`

**Request Body:**

```json
{
  "parkingZoneId": 1,
  "carId": 1
}
```

**Response:**

```json
{
  "status": "success"
}
```

### Endpoint 8: Unpark car

**Description:**
Using this endpoint user unparks his car and gets charged

**HTTP Method:**
POST

**Endpoint URL:**
`/api/user/unpark-car`

**Request Body:**

```json
{
  "carId": 1
}
```

**Response:**

```json
{
  "status": "success"
}
```

### Endpoint 9: User parking history

**Description:**
Using this endpoint user gets history of his parking

**HTTP Method:**
GET

**Endpoint URL:**
`/api/user/parking-history`

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "isParked": false,
      "createdAt": "2023-09-28T19:25:24.221Z",
      "updatedAt": "2023-09-28T19:25:29.806Z",
      "ParkingZoneId": 1,
      "CarId": 1
    }
  ]
}
```
