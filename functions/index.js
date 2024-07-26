const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

// Connect to MongoDB
const uri = functions.config().process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define your API routes
app.get("/hello", (req, res) => {
  res.send("Hello from Firebase!");
});

// Export your Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);

