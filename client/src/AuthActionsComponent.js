import React from "react";

function AuthActionsComponent() {
  async function handleLogout() {
    try {
      const response = await fetch("/api/users/logout", { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AuthActionsComponent;
