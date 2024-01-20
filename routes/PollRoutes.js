const express = require("express");
const {
  addPoll,
  getAllPoll,
  updatePoll,
  getOnePoll,
} = require("../controller/PollController");
const FetchPollByUser = require("../controller/FetchController");
const PollRoutes = express.Router();

PollRoutes.post("/", addPoll);
PollRoutes.get("/", getAllPoll);
PollRoutes.put("/:id", updatePoll);
PollRoutes.get("/:id", getOnePoll);
PollRoutes.get("/vote/:userId", FetchPollByUser);

module.exports = PollRoutes;
