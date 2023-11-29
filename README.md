# Mini-Project 10: Web Security

[![Maintainability](https://api.codeclimate.com/v1/badges/df7d557610ea4dfcb364/maintainability)](https://codeclimate.com/github/Evangre/Project1NodeBasics/maintainability)

## Features:

- **User Authentication**: Implements user registration, login, and logout using Passport.js.
- **Password Hashing and Salting**: Enhances security by hashing and salting passwords using Bcrypt.js.
- **Session Management**: Manages user sessions using `express-session` for a seamless user experience.
- **Mongoose Integration**: Utilizes Mongoose for MongoDB object data modeling.
- **CRUD Operations**: Supports CRUD operations for workouts, nutrition facts, and goals, including access control based on user identity.
- **Validation**: Uses Express-Validator for route validation.
- **JSON Web Tokens (JWT)**: Incorporates JWT for secure and efficient user authorization.
- **HTTPS**: Implements HTTPS for secure communication.
- **CORS**: Enables Cross-Origin Resource Sharing (CORS) for better security and flexibility.

## How to Run:

### Environment Setup:

1. Create a `.env` file in the root directory with the following content:
   ```env
   SESSION_SECRET=<Your_Session_Secret>
   JWT_SECRET=<Your_JWT_Secret>
   Replace <Your_Session_Secret> and <Your_JWT_Secret> with your actual secrets.
   ```

### MongoDB:

Ensure MongoDB is running on your machine:

````shell
brew services start mongodb-community@7.0


### Backend:

1. Navigate to the root directory of your project.
2. Install dependencies (if not done previously):
   ```shell
   npm install
````

3. Start the server using the command:
   ```shell
   node server.js
   ```

Access the API at `http://localhost:3001/api/users`.

### Frontend:

1. Navigate to the `client` directory.
2. Install the required dependencies (if not done previously):
   ```shell
   npm install
   ```
3. Start the React app:
   ```shell
   npm start
   ```

The frontend will now interact with the backend to fetch and display user data from MongoDB.
