//environment
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const messagesRoute = require("./routes/messages");
const bookingsRoute = require("./routes/bookings");

// Import middleware
const rejectNonJsonRequests = require("./middleware/rejectNonJsonRequests");

// express app
const app = express();

// middleware - any req that comes in looks if it has body data
app.use(express.json());

// express router
const router = express.Router();

// middleware to block users whose usernames don't end with '@gmail.com'
router.use(rejectNonJsonRequests);

// middleware - next runs next function
app.use((req, res, next) => {
  // simple cl to show path and method
  console.log(req.path, req.method);
  next();
});

// route handlers
// specify path to be used with routes
app.use("/api/user", userRoutes);
app.use("/api/messages", messagesRoute);
app.use("/api/bookings", bookingsRoute);

// connext to DB
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log("connected to database");
    // only listen or requests once connected to database
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to database and listening on port",
        process.env.PORT
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
