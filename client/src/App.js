import React, { useState, useEffect, Component } from "react";
import axios from "axios";

// Class component demonstration
class ClassComponentExample extends Component {
  render() {
    return <div>Hello from a class component! I am {this.props.name}</div>;
  }
}

// Functional component
const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  // Event handler for refreshing users
  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={handleRefresh}>Refresh</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
      <ClassComponentExample name="React" />
    </div>
  );
};

export default App;
