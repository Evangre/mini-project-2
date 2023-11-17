# Mini-Project 9: Identity Management and Encryption

[![Maintainability](https://api.codeclimate.com/v1/badges/df7d557610ea4dfcb364/maintainability)](https://codeclimate.com/github/Evangre/Project1NodeBasics/maintainability)

## Features:

- **User Authentication**: Implements user registration, login, and logout using Passport.js.
- **Password Hashing and Salting**: Enhances security by hashing and salting passwords using Bcrypt.js.
- **Session Management**: Manages user sessions using `express-session` for a seamless user experience.
- **Mongoose Integration**: Continues to utilize Mongoose for MongoDB object data modeling.
- **CRUD Operations**: Maintains CRUD operations for workouts, nutrition facts, and goals.
- **Validation**: Preserves validation on routes using Mongoose and Express-Validator.

## How to Run:

### Environment Setup:

Create a `.env` file in the root directory with the following content (replace `<Your_Secret_Key>` with your actual secret key):

`````env
SESSION_SECRET=<Your_Secret_Key>

### MongoDB:

Ensure MongoDB is running on your machine:

````shell
brew services start mongodb-community@7.0


### Backend:

1. Navigate to the root directory of your project.
2. Install dependencies (if not done previously):
   ```shell
   npm install
`````

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
