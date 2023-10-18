import React from "react";
import { useFetchUsers } from "./useFetchUsers";

const App = () => {
  const { users, loading, fetchUsers } = useFetchUsers();

  return (
    <div>
      <h1>User List</h1>
      <button onClick={fetchUsers}>Refresh</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
