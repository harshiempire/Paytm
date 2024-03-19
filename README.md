# Basic and Low Level Payments App

This is a basic payments app that demonstrates fundamental concepts to consider when building such an application. While it's not production-ready, it serves as a starting point for learning and experimentation.

## Technologies Used

### Backend
- Express
- MongoDB

### Frontend
- React
- Vite

## Features

- User signup and signin with JWT authentication
- Display user balance
- Search and send money to other users

## Getting Started

### Clone the project:

```bash
git clone https://github.com/harshiempire/Paytm.git
```

### Set up the backend:

Create a `config.js` file in the backend folder and export a `JWT_SECRET` key:

```javascript
module.exports = {
  JWT_SECRET: "your_secret_key", // Replace with a strong secret key
};
```

### Choose a MongoDB option:

**Option 1: Local MongoDB with Docker (for development):**

- Build a Docker image:

```bash
docker build ./ -t mongodb:4.7-replset
```

- Run the container:

```bash
docker run --name mongodb-replset22 -p 27017:27017 -d mongodb:4.7-replset
```

- Connect to the local MongoDB instance using MongoDB Compass.

**Option 2: MongoDB Atlas (recommended for production):**

- Create a MongoDB Atlas account and set up a cluster.
- Connect to the cluster using MongoDB Compass.

### Start the backend server:

```bash
cd backend
npm install
npm start
```

### Start the frontend development server:

```bash
cd frontend
npm install
npm run dev
```

Access the app in your browser at [http://localhost:3000](http://localhost:3000).

## Potential Improvements

- Error Handling: Implement robust error handling in both backend and frontend.
- Security: Enhance security with input validation, sanitization, and stronger JWT practices.
- Testing: Add unit and integration tests to ensure functionality and prevent regressions.
- Production Readiness: Optimize code for production deployment.

## Disclaimer

This code is for educational purposes only and is not intended for production use without significant modifications and security enhancements.
```

This formatted version should be easier to copy and paste into your README.md file.