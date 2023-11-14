# Mini-Project 8: Mongoose

[![Maintainability](https://api.codeclimate.com/v1/badges/df7d557610ea4dfcb364/maintainability)](https://codeclimate.com/github/Evangre/Project1NodeBasics/maintainability)

## Features:

- **Mongoose Integration**: Utilizes Mongoose for MongoDB object data modeling, providing a schema-based solution to model application data.
- **CRUD Operations**: Implements routes to support CRUD operations for workouts, nutrition facts, and goals.
- **Validation**: Adds validation on routes using Mongoose and Express-Validator to ensure accurate and secure data entry.
- **Data Modeling**: Models for user data, workouts, nutrition facts, and goals have been defined using Mongoose schemas.

## How to run:

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
