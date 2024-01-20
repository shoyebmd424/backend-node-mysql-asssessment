const { user, questions, vote, poll, analytics } = require("../models");

const SubmitPoll = async (req, res) => {
  const userId = req.params.userId;
  const questionId = req.params.questionId;
  const selectedOption = req.body.selectedOption;

  try {
    const userRes = await user.findByPk(userId);
    const question = await questions.findByPk(questionId);
    const isSolved = await vote.findOne({
      where: { questionId: questionId, userId: userId },
    });
    if (isSolved) {
      return res
        .status(400)
        .json({ message: "User has already completed this question" });
    }
    if (!question.options.includes(selectedOption)) {
      return res
        .status(400)
        .json({ message: "Invalid option for the question" });
    }
    const pollres = await poll.findOne({ where: { id: question } });

    const rewardAmount = () => {
      if (pollres) {
        return Math.floor(
          Math.random() * (pollres.maxReward - pollres.minReward + 1) +
            question.minReward
        );
      }
    };
    await vote.create({
      userId,
      questionId,
      answer: selectedOption,
      reward: rewardAmount(),
    });

    const Analytics = await analytics.findOne({
      where: { poll_id: question.poll_id },
    });
    Analytics.totalVotes += 1;
    Analytics.optionCounts[selectedOption] =
      (Analytics.optionCounts[selectedOption] || 0) + 1;
    await Analytics.save();
    res.status(200).json({
      message: "Poll submitted successfully",
      earnRewar: rewardAmount(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPollAnalytics = async (req, res) => {
  try {
    const overallAnalytics = await analytics.findOne({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("totalVotes")), "totalVotes"],
        [
          sequelize.fn("json_object_agg", sequelize.literal("optionCounts")),
          "optionCounts",
        ],
      ],
    });
    res.status(200).json({
      totalVotes: overallAnalytics.totalVotes,
      optionCounts: overallAnalytics.optionCounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getParticularPoll = async (req, res) => {
  const pollId = req.params.pollId;

  try {
    const pollAnalytics = await analytics.findOne({
      where: { pollId: pollId },
      attributes: [
        "pollId",
        [sequelize.fn("SUM", sequelize.col("totalVotes")), "totalVotes"],
        [
          sequelize.fn("json_object_agg", sequelize.literal("optionCounts")),
          "optionCounts",
        ],
      ],
      include: [
        {
          model: Vote,
          attributes: ["selectedOption"],
          where: { pollId: pollId },
          required: false,
        },
      ],
      group: ["Analytics.pollId", "Vote.selectedOption"],
    });

    res.status(200).json({
      pollId: pollAnalytics.pollId,
      totalVotes: pollAnalytics.totalVotes || 0,
      optionCounts: pollAnalytics.optionCounts || {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { SubmitPoll, getPollAnalytics, getParticularPoll };
