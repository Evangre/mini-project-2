import React, { useState } from "react";

function AddGoalComponent() {
  const [goalType, setGoalType] = useState("");
  const [target, setTarget] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal_type: goalType, target }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Goal added:", result);
      setGoalType("");
      setTarget("");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add Goal</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Goal Type:
          <input
            type="text"
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            disabled={submitting}
          />
        </label>
        <label>
          Target:
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={submitting}
          />
        </label>
        <button type="submit" disabled={submitting}>
          Add Goal
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default AddGoalComponent;
