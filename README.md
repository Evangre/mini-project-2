# Mini-Project 7: MongoDB Basics

[![Maintainability](https://api.codeclimate.com/v1/badges/df7d557610ea4dfcb364/maintainability)](https://codeclimate.com/github/Evangre/Project1NodeBasics/maintainability)

## Features:

- **MongoDB Integration**:
  - Added MongoDB as a data storage for the application, replacing the previous file-based storage system.
- **Mongosh and MongoDB Compass**:
  - Introduced tools for MongoDB interactions and data manipulation.
- **Mongoose ODM**:
  - Utilized Mongoose for object data modeling to simplify interactions with MongoDB.
- **New Collections and Documents**:
  - Created new collections and documents within MongoDB to store user data.
- **Updated API Endpoints**:
  - The Express backend now includes API endpoints to interact with MongoDB for data retrieval and storage.

## How to run:

### MongoDB:

- Ensure MongoDB is running on your machine:
  ```shell
  brew services start mongodb-community@7.0
  ```

### Backend:

1. Navigate to the root directory of your project.
2. Install dependencies (if not done previously):
   ```shell
   npm install
   ```
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
