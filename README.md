#NestJs Backend Practice

##Overview

**Security:** JWT authentication/ AuthGuard
**DataBase:** Postgres DB/ TypeORM entity mapped to DB/ DTO validation
**User:** Basic CRUD
**Docker:** Docker-compose

##User Module

- /users CRUD
- /me

##Authentication Module

- Login with email + password

- JWT token generation

- Route protection using AuthGuards

- Token validation using Passport JWT Strategy

##Project Architecture:

  **Controller:** Receives HTTP requests -> Validates and forwards data via DTOs -> Calls service
  **Service:** Contain logic -> handle operations, validation, database.
  **Module:** Organizes controller and service 
  **Entity:**	Database table structure
  **DTO:**	Validation rules


