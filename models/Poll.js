module.exports = (sequelize, DataTypes) => {
  const Poll = sequelize.define("Poll", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter Title" },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter category " },
      },
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter start date" },
      },
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter end date" },
      },
    },
    minReward: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter min reward" },
      },
    },
    maxReward: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter max reward" },
      },
    },
  });
  // Poll.hasMany(Questions);
  // Questions.belongsTo(Poll);

  return Poll;
};
