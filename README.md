# Task Management Web Application

A MERN stack task management app with JWT authentication, protected task APIs, responsive React UI, CRUD operations, search, filter, pagination, and status tracking.

## Features

- User registration and login
- JWT based authentication
- Protected task routes
- Create, view, update, and delete tasks
- Mark tasks as `pending` or `completed` from the task card toggle or edit form
- Search tasks by title, description, or status
- Filter tasks by status
- Pagination
- Responsive dashboard UI
- Loading spinners and success/error messages

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js

## Project Structure

```txt
task-managment-app/
  node_backend/
    controller/
    middleware/
    model/
    routes/
    index.js
  react_frontend/
    frontend/
      src/
        components/
        constants/
        pages/
        services/
```

## Backend Setup

```bash
cd node_backend
npm install
npm start
```

Create a `.env` file in `node_backend`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Backend runs on:

```txt
http://localhost:3000
```

## Frontend Setup

```bash
cd react_frontend/frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

For production deployment, set this environment variable in the frontend hosting dashboard:

```env
VITE_API_URL=https://your-backend-api-url.com
```

Build command:

```bash
npm run build
```

Publish/output directory:

```txt
dist
```

## API Routes

Auth:

```txt
POST /userapi/post-user
POST /userapi/login-user
```

Tasks:

```txt
GET    /taskapi/get-task
GET    /taskapi/get-task/:id
POST   /taskapi/post-task
PUT    /taskapi/update-task/:id
DELETE /taskapi/delete-task/:id
```

Protected task routes require:

```txt
Authorization: Bearer <token>
```

## Notes

- Login/register must be completed before accessing the dashboard.
- Each user can only access their own tasks.
- The task status is stored as `pending` or `completed`.
