import React, { useState } from "react";

function AddNutritionComponent() {
  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meal, calories, protein }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Nutrition added:", result);
      setMeal("");
      setCalories("");
      setProtein("");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add Nutrition Info</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Meal:
          <input
            type="text"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            disabled={submitting}
          />
        </label>
        <label>
          Calories:
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            disabled={submitting}
          />
        </label>
        <label>
          Protein (grams):
          <input
            type="number"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            disabled={submitting}
          />
        </label>
        <button type="submit" disabled={submitting}>
          Add Nutrition
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default AddNutritionComponent;
