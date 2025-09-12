# API Documentation

## User Endpoints

### POST /users/register

#### Description
This endpoint allows users to register by providing their personal information. Upon successful registration, a JSON Web Token (JWT) is generated for the user.

#### Request Body
The request body must be in JSON format and include the following fields:
- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (minimum 3 characters).
  - `lastname`: A string representing the user's last name (minimum 2 characters).
- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

#### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Responses
- **201 Created**: User successfully registered.
  - Response body:
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```
- **400 Bad Request**: Validation errors (e.g., missing fields or invalid email format).

---

### POST /users/login

#### Description
This endpoint allows users to log in by providing their email and password. Upon successful authentication, a JSON Web Token (JWT) is generated for the user and returned with the user details.

#### Request Body
The request body must be in JSON format and include the following fields:
- `email`: A string representing the user's email address (must be a valid email format).
- `password`: A string representing the user's password (minimum 6 characters).

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Responses
- **200 OK**: Successful login.
  - Response body:
  ```json
  {
    "token": "JWT_TOKEN_HERE",
    "user": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```
- **400 Bad Request**: If validation fails.
- **401 Unauthorized**: Authentication failure due to invalid email or password.

---

### GET /users/logout

#### Description
This endpoint logs out the user by blacklisting the provided JWT and clearing the authentication cookie.

#### Request Headers / Cookies
- The token must be provided either in a `token` cookie or in the `Authorization` header as a Bearer token.

#### Example Request
```
GET /users/logout
Cookie: token=JWT_TOKEN_HERE
```
_or_
```
GET /users/logout
Authorization: Bearer JWT_TOKEN_HERE
```

#### Responses
- **200 OK**: User successfully logged out.
  - Response body:
  ```json
  {
    "message": "Logged out"
  }
  ```
- **401 Unauthorized**: If there is no valid token provided or if the token has been blacklisted.

---

### GET /users/profile

#### Description
This endpoint returns the profile information of the authenticated user. The user must be logged in and provide a valid JWT via cookies or the Authorization header.

#### Request Headers / Cookies
- The token must be provided either in a `token` cookie or in the `Authorization` header as a Bearer token.

#### Example Request
```
GET /users/profile
Cookie: token=JWT_TOKEN_HERE
```
_or_
```
GET /users/profile
Authorization: Bearer JWT_TOKEN_HERE
```

#### Responses
- **200 OK**: Returns the user profile.
  - Response body:
  ```json
  {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```
- **401 Unauthorized**: If there is no valid token provided or if the token is invalid.

---
 
## Captain Endpoints

### POST /captain/register

#### Description
This endpoint allows captains to register by providing their personal, login, and vehicle information. Upon successful registration, a JWT is generated for the captain.

#### Request Body
The request body must be in JSON format and include the following fields:
- `fullname`: An object containing:
  - `firstname`: A string representing the captain's first name (minimum 3 characters).
  - `lastname`: A string representing the captain's last name.
- `email`: A string representing the captain's email address (must be a valid email format).
- `password`: A string representing the captain's password (minimum 6 characters).
- `vehicle`: An object containing:
  - `color`: A string representing the vehicle's color.
  - `plate`: A string representing the vehicle's plate number.
  - `capacity`: A number representing the vehicle's capacity (minimum 1).
  - `vehicleType`: A string that must be either `car`, `motorcycle`, or `auto`.

#### Example Request
```json
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Responses
- **201 Created**: Captain successfully registered.
  - Response body:
  ```json
  {
    "capTainToken": "JWT_TOKEN_HERE",
    "captain": {
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **400 Bad Request**: Validation errors or if the captain already exists.

---

### POST /captain/login

#### Description
This endpoint allows captains to log in by providing their email and password. Upon successful authentication, a JWT is generated for the captain and returned with the captain's details.

#### Request Body
The request body must be in JSON format and include the following fields:
- `email`: A string representing the captain's email address (must be a valid email format).
- `password`: A string representing the captain's password (minimum 6 characters).

#### Example Request
```json
{
  "email": "alice.smith@example.com",
  "password": "securepassword"
}
```

#### Responses
- **200 OK**: Successful login.
  - Response body:
  ```json
  {
    "captaintoken": "JWT_TOKEN_HERE",
    "captain": {
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **400 Bad Request**: If validation fails or credentials are invalid.

---

### GET /captain/logout

#### Description
This endpoint logs out the captain by blacklisting the provided JWT and clearing the authentication cookie.

#### Request Headers / Cookies
- The token must be provided either in a `captainToken` cookie or in the `Authorization` header as a Bearer token.

#### Example Request
```
GET /captain/logout
Cookie: captainToken=JWT_TOKEN_HERE
```
_or_
```
GET /captain/logout
Authorization: Bearer JWT_TOKEN_HERE
```

#### Responses
- **200 OK**: Captain successfully logged out.
  - Response body:
  ```json
  {
    "message": "Logged out"
  }
  ```
- **401 Unauthorized**: If there is no valid token provided or if the token has been blacklisted.

---

### GET /captain/profile

#### Description
This endpoint returns the profile information of the authenticated captain. The captain must be logged in and provide a valid JWT via cookies or the Authorization header.

#### Request Headers / Cookies
- The token must be provided either in a `captainToken` cookie or in the `Authorization` header as a Bearer token.

#### Example Request
```
GET /captain/profile
Cookie: captainToken=JWT_TOKEN_HERE
```
_or_
```
GET /captain/profile
Authorization: Bearer JWT_TOKEN_HERE
```

#### Responses
- **200 OK**: Returns the captain's profile.
  - Response body:
  ```json
  {
    "captain": {
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```
- **401 Unauthorized**: If there is no valid token provided or if the token is invalid.

---

## Status Codes

- `201`: Resource created successfully.
- `200`: Successful operation (login, logout, or profile retrieval).
- `400`: Bad request due to validation errors.
- `401`: Unauthorized access due to invalid credentials or token.