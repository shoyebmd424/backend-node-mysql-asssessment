const { vote, questions, poll } = require("../models");
const { Sequelize } = require("sequelize");

const FetchPollByUser = async (req, res) => {
  const userId = req.params.userId;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  try {
    const userVotes = await vote.findAll({
      where: { user_id: userId },
      include: [
        {
          model: questions,
          as: "questions",
          attributes: ["id"],
        },
      ],
    });
    const answeredQuestionIds = userVotes.map((vote) => vote.Question.id);
    const unansweredQuestions = await questions.findAll({
      where: {
        poll_id: {
          [Sequelize.Op.notIn]: answeredQuestionIds,
        },
      },
    });
    const userPolls = await poll.findAll({
      where: {
        startDate: {
          [Sequelize.Op.gte]: startDate,
        },
        endDate: {
          [Sequelize.Op.lte]: endDate,
        },
      },
      include: [
        {
          model: questions,
          as: "questions",
          where: {
            id: {
              [Sequelize.Op.in]: unansweredQuestions.map(
                (question) => question.id
              ),
            },
          },
        },
      ],
    });
    if (!userPolls || userPolls.length === 0) {
      return res.status(404).json({ message: "No new polls exist" });
    }
    const firstUnansweredQuestion =
      userPolls[0]?.questions && userPolls[0]?.questions[0];

    console.log(userPolls[0].questions[0]);
    if (!firstUnansweredQuestion) {
      return res.status(404).json({ message: "No new polls exist" });
    }

    res.status(200).json({
      question: firstUnansweredQuestion,
      poll: userPolls[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = FetchPollByUser;
