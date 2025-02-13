# Backend Dashboard

This is a backend dashboard application built with Node.js, Express, and MongoDB. It includes user authentication, point assignment for tasks, milestone achievements, and dashboard summaries.

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=your_port_number (default is 5000)
   ```

## Running the Application

1. Run `npm start` to start the server
2. The server will run on the port specified in the `.env` file or default to port 5000

## Routes

### Authentication Routes

- **POST /api/auth/signup**
  - Registers a new user
  - Request body: `{ "name": "string", "email": "string", "password": "string" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /api/auth/login**
  - Logs in a user
  - Request body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "string", "userId": "string", "name": "string", "email": "string" }`

### User Routes

- **POST /api/users**
  - Creates a new user
  - Request body: `{ "name": "string", "email": "string" }`
  - Response: `{ "user": "object" }`

### Point System Routes

- **POST /api/points/assign**
  - Assigns points for task completion
  - Request body: `{ "userId": "string", "taskName": "string", "points": "number" }`
  - Response: `{ "message": "Points assigned successfully", "totalPoints": "number" }`

- **POST /api/milestone/achieve**
  - Handles bonus points for milestone achievements
  - Request body: `{ "userId": "string", "milestoneName": "string", "rewardPoints": "number" }`
  - Response: `{ "message": "Milestone achieved!", "totalPoints": "number" }`

### Dashboard Routes

- **GET /api/dashboard/summary/:userId**
  - Gets a summary of the user's dashboard
  - Response: `{ "name": "string", "totalPoints": "number", "completedTasks": "number", "milestonesAchieved": "number" }`

- **GET /api/dashboard/details/:userId**
  - Gets detailed information of the user's dashboard
  - Response: `{ "name": "string", "totalPoints": "number", "activities": "array", "milestones": "array" }`

## Route Table

| Method | Route                          | Description                              |
|--------|--------------------------------|------------------------------------------|
| POST   | /api/auth/signup               | Registers a new user                     |
| POST   | /api/auth/login                | Logs in a user                           |
| POST   | /api/users                     | Creates a new user                       |
| POST   | /api/points/assign             | Assigns points for task completion       |
| POST   | /api/milestone/achieve         | Handles bonus points for milestones      |
| GET    | /api/dashboard/summary/:userId | Gets a summary of the user's dashboard   |
| GET    | /api/dashboard/details/:userId | Gets detailed information of the dashboard|

## Models

### User Model

- **name**: String, required
- **email**: String, required, unique
- **password**: String, required
- **points**: Number, default 0
- **activities**: Array of objects with fields:
  - **name**: String
  - **points**: Number
  - **completed**: Boolean, default false
  - **dateCompleted**: Date
- **milestones**: Array of objects with fields:
  - **name**: String
  - **rewardPoints**: Number
  - **achieved**: Boolean, default false
  - **dateAchieved**: Date
