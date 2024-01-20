const express = require("express");
const {
  SubmitPoll,
  getParticularPoll,
  getPollAnalytics,
} = require("../controller/SubmitPoll");
const userRoutes = express();

userRoutes.get("/:userId/submit-poll", SubmitPoll);
userRoutes.get("/:pollId/analytics", getParticularPoll);
userRoutes.get("/analytics", getPollAnalytics);

module.exports = userRoutes;
