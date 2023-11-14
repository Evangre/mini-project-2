import React from "react";
import AddUserComponent from "./AddUserComponent";
import UsersComponent from "./UsersComponent";
import AddWorkoutComponent from "./AddWorkoutComponent";
import AddNutritionComponent from "./AddNutritionComponent";
import AddGoalComponent from "./AddGoalComponent";

function App() {
  return (
    <div className="App">
      <AddUserComponent />
      <UsersComponent />
      <AddWorkoutComponent />
      <AddNutritionComponent />
      <AddGoalComponent />
    </div>
  );
}

export default App;
