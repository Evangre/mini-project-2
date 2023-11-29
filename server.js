const express = require("express");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const https = require("https");
const fs = require("fs");

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
  password: String,
});

const User = mongoose.model("User", userSchema);

// New Workout Schema
const workoutSchema = new mongoose.Schema({
  type: String,
  duration: Number,
  calories_burned: Number,
  posted_by: mongoose.Schema.Types.ObjectId, // New field
});
const Workout = mongoose.model("Workout", workoutSchema);

const nutritionSchema = new mongoose.Schema({
  meal: String,
  calories: Number,
  protein: Number,
  posted_by: mongoose.Schema.Types.ObjectId, // New field
});
const Nutrition = mongoose.model("Nutrition", nutritionSchema);

const goalSchema = new mongoose.Schema({
  goal_type: String,
  target: Number,
  posted_by: mongoose.Schema.Types.ObjectId, // New field
});
const Goal = mongoose.model("Goal", goalSchema);

// Passport.js Configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ name: username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: "Incorrect username or password." });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// User Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Middleware to validate JWT and protect routes
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return next(); // If there's no token, skip
  }
  const token = req.headers.authorization.split(" ")[1]; // Get the token from the header
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    req.user = decoded; // Set the user in the request object
    next();
  });
});

// CRUD Operations for Workouts
app.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Example of a protected route that requires JWT
app.post(
  "/workouts",
  [
    body("type").notEmpty(),
    body("duration").isNumeric(),
    body("calories_burned").isNumeric(),
  ],
  async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const workout = new Workout({
      ...req.body,
      posted_by: req.user._id, // Set the user ID from JWT
    });

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
    const nutritionEntries = await Nutrition.find({ posted_by: req.user._id });
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
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const nutritionEntry = new Nutrition({
      ...req.body,
      posted_by: req.user._id, // Set the user ID from JWT
    });

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
      const nutritionEntry = await Nutrition.findOneAndUpdate(
        {
          _id: req.params.id,
          posted_by: req.user._id, // Check if the user is the owner
        },
        req.body,
        { new: true }
      );

      if (!nutritionEntry) {
        return res
          .status(404)
          .json({ message: "Nutrition entry not found or unauthorized" });
      }
      res.json(nutritionEntry);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Delete a nutrition entry
app.delete("/nutrition/:id", async (req, res) => {
  try {
    const nutritionEntry = await Nutrition.findOneAndDelete({
      _id: req.params.id,
      posted_by: req.user._id, // Check if the user is the owner
    });

    if (!nutritionEntry) {
      return res
        .status(404)
        .json({ message: "Nutrition entry not found or unauthorized" });
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

// Authentication Routes
// Registration
app.post("/api/users/register", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ name: req.body.name, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login
app.post("/api/users/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Logged in successfully" });
});

// Logout
app.get("/api/users/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" });
});

// Server setup
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}/`);
// });

// HTTPS Configuration
const httpsOptions = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`HTTPS server running on https://localhost:${PORT}/`);
});
