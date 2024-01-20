const express = require("express");
const {
  addQuestion,
  getAllQuestion,
  updateQuestion,
} = require("../controller/QuestionController");
const QuestionRoutes = express.Router();

QuestionRoutes.post("/", addQuestion);
QuestionRoutes.get("/", getAllQuestion);
QuestionRoutes.put("/:id", updateQuestion);

module.exports = QuestionRoutes;
