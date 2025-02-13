const express = require("express");
const {
  assignPoints,
  handleMilestone,
} = require("../controllers/pointController");
const {
  getDashboardSummary,
  getDashboardDetails,
} = require("../controllers/dashboardController");
const { createUser } = require("../controllers/userController");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Authentication routes
router.post('/auth/signup', registerUser);
router.post('/auth/login', loginUser);

//User route
router.post('/users',createUser)

// Point system routes
router.post("/points/assign", assignPoints);
router.post("/milestone/achieve", handleMilestone);

// Dashboard routes
router.get("/dashboard/summary/:userId", getDashboardSummary);
router.get("/dashboard/details/:userId", getDashboardDetails);

module.exports = router;