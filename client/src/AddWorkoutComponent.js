import React, { useState } from "react";

function AddWorkoutComponent() {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          duration,
          calories_burned: caloriesBurned,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Workout added:", result);
      setType("");
      setDuration("");
      setCaloriesBurned("");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add Workout</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Type:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            disabled={submitting}
          />
        </label>
        <label>
          Duration (in minutes):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            disabled={submitting}
          />
        </label>
        <label>
          Calories Burned:
          <input
            type="number"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            disabled={submitting}
          />
        </label>
        <button type="submit" disabled={submitting}>
          Add Workout
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default AddWorkoutComponent;
