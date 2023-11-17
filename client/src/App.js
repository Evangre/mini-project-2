import React from "react";
import RegisterComponent from "./RegisterComponent";
import LoginComponent from "./LoginComponent";
import AuthActionsComponent from "./AuthActionsComponent";
import AddUserComponent from "./AddUserComponent";
import UsersComponent from "./UsersComponent";
import AddWorkoutComponent from "./AddWorkoutComponent";
import AddNutritionComponent from "./AddNutritionComponent";
import AddGoalComponent from "./AddGoalComponent";

function App() {
  return (
    <div className="App">
      <RegisterComponent />
      <LoginComponent />
      <AuthActionsComponent />
      <AddUserComponent />
      <UsersComponent />
      <AddWorkoutComponent />
      <AddNutritionComponent />
      <AddGoalComponent />
    </div>
  );
}

export default App;
