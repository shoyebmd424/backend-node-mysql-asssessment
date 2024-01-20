const db = require("../models");
const Question = db.questions;
const addQuestion = async (req, res) => {
  try {
    console.log(req.body);
    const question = await Question.create(req.body);
    res.status(200).send(question);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!question) {
      return res.status(404).send("Question not found");
    }
    const result = await Question.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong...");
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).send(questions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
const getOneQuestion = async (req, res) => {
  try {
    const questions = await Question.findOne();
    res.status(200).send(questions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  addQuestion,
  updateQuestion,
  getAllQuestion,
  getOneQuestion,
};
