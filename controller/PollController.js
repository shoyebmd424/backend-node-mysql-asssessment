const db = require("../models");
const Poll = db.poll;
const Question = db.questions;
const addPoll = async (req, res) => {
  try {
    const poll = await Poll.create(req.body);
    res.status(200).send(poll);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
const updatePoll = async (req, res) => {
  try {
    const poll = await Poll.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!poll) {
      return res.status(404).send("poll not found");
    }
    const result = await Poll.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong...");
  }
};

const getAllPoll = async (req, res) => {
  try {
    const polls = await Poll.findAll({
      include: [
        {
          model: Question,
          as: "questions",
        },
      ],
    });

    res.status(200).send(polls);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
const getOnePoll = async (req, res) => {
  try {
    const polls = await Poll.findOne({
      include: [
        {
          model: Question,
          as: "questions",
        },
      ],
    });
    res.status(200).send(polls);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = { addPoll, updatePoll, getAllPoll, getOnePoll };
