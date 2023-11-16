const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/evansDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Existing User Schema
const userSchema = new mongoose.Schema({
  name: String,
  
});
const User = mongoose.model("User", userSchema);

// New Workout Schema
const workoutSchema = new mongoose.Schema({
  type: String,
  duration: Number,
  calories_burned: Number,
});
const Workout = mongoose.model("Workout", workoutSchema);

// New Nutrition Schema
const nutritionSchema = new mongoose.Schema({
  meal: String,
  calories: Number,
  protein: Number,
});
const Nutrition = mongoose.model("Nutrition", nutritionSchema);

// New Goal Schema
const goalSchema = new mongoose.Schema({
  goal_type: String,
  target: Number,
});
const Goal = mongoose.model("Goal", goalSchema);

// CRUD Operations for Workouts
app.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  "/workouts",
  [
    body("type").notEmpty(),
    body("duration").isNumeric(),
    body("calories_burned").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const workout = new Workout(req.body);
    try {
      await workout.save();
      res.status(201).json(workout);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Update a workout
app.put(
  "/workouts/:id",
  [
    body("type").optional().isString(),
    body("duration").optional().isNumeric(),
    body("calories_burned").optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedWorkout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      res.json(updatedWorkout);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Delete a workout
app.delete("/workouts/:id", async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// CRUD Operations for Nutrition
app.get("/nutrition", async (req, res) => {
  try {
    const nutritionEntries = await Nutrition.find();
    res.json(nutritionEntries);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  "/nutrition",
  [
    body("meal").notEmpty(),
    body("calories").isNumeric(),
    body("protein").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const nutritionEntry = new Nutrition(req.body);
    try {
      await nutritionEntry.save();
      res.status(201).json(nutritionEntry);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Update a nutrition entry
app.put(
  "/nutrition/:id",
  [
    body("meal").optional().isString(),
    body("calories").optional().isNumeric(),
    body("protein").optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedNutrition = await Nutrition.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedNutrition) {
        return res.status(404).json({ message: "Nutrition entry not found" });
      }
      res.json(updatedNutrition);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Delete a nutrition entry
app.delete("/nutrition/:id", async (req, res) => {
  try {
    const nutritionEntry = await Nutrition.findByIdAndDelete(req.params.id);
    if (!nutritionEntry) {
      return res.status(404).json({ message: "Nutrition entry not found" });
    }
    res.json({ message: "Nutrition entry deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// CRUD Operations for Goals
app.get("/goals", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  "/goals",
  [body("goal_type").notEmpty(), body("target").isNumeric()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const goal = new Goal(req.body);
    try {
      await goal.save();
      res.status(201).json(goal);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Update a goal
app.put(
  "/goals/:id",
  [
    body("goal_type").optional().isString(),
    body("target").optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedGoal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      res.json(updatedGoal);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Delete a goal
app.delete("/goals/:id", async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User({ name: req.body.name });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
