# Mini-Project 6: Advanced React - State and Hooks

[![Maintainability](https://api.codeclimate.com/v1/badges/df7d557610ea4dfcb364/maintainability)](https://codeclimate.com/github/Evangre/Project1NodeBasics/maintainability)

## Features:

- **Integration of React frontend with a Node.js backend**:
  - This project continues from Mini-Project 5, enhancing its functionalities.
- **Use of JSX** to create UI elements.
- **Both Functional and Class Components**:
  - Transition from class components to functional components for a more modern approach.
- **State Management using useState and useEffect Hooks**:
  - Used `useState` for managing local states like user data and loading state.
  - Used `useEffect` to handle side-effects like fetching user data from an API.
- **Custom Hook (`useFetchUsers`)**:
  - Created a custom hook to encapsulate the logic for fetching users. This makes the logic reusable for other components or features in the future.
- **Conditional Rendering**:
  - Implemented conditional rendering for loading states and data display.
- **Enhanced User Interface**:
  - With conditional rendering, users are now provided with a loading feedback, enhancing user experience.
- **RESTful API integration**:
  - The React frontend fetches user data from a backend RESTful API.

## How to run:

### Backend:

1. **Navigate to the root directory**.
2. **Start the server** using the command:
   node server.js

Access the API at `http://localhost:3000/api/users`.

### Frontend:

1. Navigate to the `client` directory:
   cd client
2. Install the required dependencies:
   npm install
3. Start the React app:
   npm start
