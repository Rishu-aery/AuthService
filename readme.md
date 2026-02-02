# Auth Service

A robust authentication and authorization microservice built with Node.js, Express, and Sequelize ORM. Provides user authentication, JWT token management, and role-based access control.

## Features

- 🔐 **User Authentication** - Secure signup and signin with bcrypt password hashing
- 🎫 **JWT Token Management** - Stateless authentication with JSON Web Tokens
- 👥 **Role-Based Access Control (RBAC)** - Admin role verification
- 🛡️ **Custom Error Handling** - Structured error responses with proper HTTP status codes
- 🗄️ **Database Integration** - MySQL database with Sequelize ORM
- ✅ **Input Validation** - Middleware-based request validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: bcrypt, jsonwebtoken
- **Validation**: Custom middleware

## Project Structure

```
AuthService/
├── src/
│   ├── config/          # Database and server configuration
│   ├── controller/      # Request handlers
│   ├── middleware/      # Authentication and validation middleware
│   ├── models/          # Sequelize models (User, Role)
│   ├── repository/      # Database operations layer
│   ├── routes/          # API routes
│   ├── service/         # Business logic layer
│   ├── utils/           # Error handlers and constants
│   ├── migrations/      # Database migrations
│   ├── seeders/         # Database seeders
│   └── server.js        # Application entry point
├── package.json
└── readme.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AuthService
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Configure database**
   
   Update `src/config/config.json` with your MySQL credentials:
   ```json
   {
     "development": {
       "username": "your_mysql_username",
       "password": "your_mysql_password",
       "database": "AuthService",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

5. **Create database**
   ```bash
   npx sequelize-cli db:create
   ```

6. **Run migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```

7. **Seed roles** (Optional)
   ```bash
   npx sequelize-cli db:seed:all
   ```

8. **Start the server**
   ```bash
   npm start
   ```

   Server will run on `http://localhost:3001`

## API Endpoints

### Authentication

#### Signup
```http
POST /api/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "email": "user@example.com"
  },
  "success": true,
  "message": "Successfully Signed Up"
}
```

#### Signin
```http
POST /api/v1/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "success": true,
  "message": "Successfully Signed In"
}
```

### Authorization

#### Check Authentication
```http
GET /api/v1/isauthenticated
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "data": 1,
  "success": true,
  "message": "User Authenticated"
}
```

#### Check Admin Role
```http
POST /api/v1/isAdmin
Content-Type: application/json

{
  "userId": 1
}
```

**Response:**
```json
{
  "data": true,
  "success": true,
  "message": "Successfully fetched user is admin or not"
}
```

## Error Handling

The service uses custom error classes for consistent error responses:

- **ValidationError** (400) - Invalid input data
- **ClientError** (4xx) - Client-side errors (e.g., 404 Not Found, 401 Unauthorized)
- **InternalError** (5xx) - Server-side errors

**Error Response Format:**
```json
{
  "data": null,
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "errors": []
}
```

## Database Schema

### User Model
- `id` - Primary Key
- `email` - Unique, Not Null
- `password` - Hashed, Not Null
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Role Model
- `id` - Primary Key
- `role` - Enum (ADMIN, CUSTOMER, etc.)
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

**Relationships:** User ↔ Role (Many-to-Many)

## Architecture

The service follows a layered architecture pattern:

1. **Routes** → Entry point for API requests
2. **Middleware** → Validation and authentication
3. **Controller** → Request/response handling
4. **Service** → Business logic
5. **Repository** → Database operations
6. **Models** → Data structure definitions

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT tokens with 1-day expiration
- Input validation middleware
- Role-based access control
- Secure error messages (no sensitive data exposure)

## Development

### Available Scripts

- `npm start` - Start development server with nodemon
- `npx sequelize-cli db:migrate` - Run migrations
- `npx sequelize-cli db:migrate:undo` - Rollback migration
- `npx sequelize-cli db:seed:all` - Run all seeders

### Creating Migrations

```bash
npx sequelize-cli migration:generate --name migration-name
```

### Creating Seeders

```bash
npx sequelize-cli seed:generate --name seeder-name
```

## License

ISC

## Author

Rishabh Aery