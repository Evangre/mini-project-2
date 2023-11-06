const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/evansDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("User", userSchema);

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

app.listen(3001, () => {
  console.log("Server running on <http://localhost:3001/>");
});
