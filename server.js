//environment
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const userRoutes = require("./routes/user");
const messagesRoute = require("./routes/messages");
const bookingsRoute = require("./routes/bookings");
const guestsRoute = require("./routes/guests");
const scheduleRoute = require("./routes/schedule");
const emailRoutes = require("./routes/email");
const cors = require("cors");

// Import middleware
const rejectNonJsonRequests = require("./middleware/rejectNonJsonRequests");

// express app
const app = express();

// CORS Configuration
const corsOptions = {
  origin: ["https://sunvalleyweddings-webapp-1888a64d91e3.herokuapp.com", "http://localhost:3000"], // Allow your frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies/auth headers
};

app.use(cors(corsOptions)); // Apply CORS

// middleware - any req that comes in looks if it has body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express router
const router = express.Router();

// middleware to block users whose usernames don't end with '@gmail.com'
router.use(rejectNonJsonRequests);

// middleware - next runs next function
app.use((req, res, next) => {
  // force CORS headers in your routes
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // simple cl to show path and method
  console.log(req.path, req.method);
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/manifest.json", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "manifest.json"));
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "favicon.ico"));
});

// route handlers
// path to be used with routes
app.use("/api/user", userRoutes);
app.use("/api/messages", messagesRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/guests", guestsRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/email", emailRoutes); // Future use

// connext to DB
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
      console.log("Server listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); // Exits process on failure
  });
