const { vote } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    type: {
      type: DataTypes.ENUM("single", "multiple"),
      allowNull: false,
      validate: {
        notNull: { msg: "Enter type" },
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter text" },
      },
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter options" },
      },
    },
  });

  //   Questions.belongsTo(PollModel(sequelize), {
  //     foreignKey: "poll_id",
  //     as: "Poll",
  //   });
  //   PollModel(sequelize).hasMany(Questions, {
  //     foreignKey: "poll_id",
  //     as: "Question",
  //   });
  return Questions;
};
