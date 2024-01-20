module.exports = (sequelize, DataTypes) => {
  const vote = sequelize.define("vote", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    reward: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Enter reward" },
      },
    },
    answer: {
      type: DataTypes.STRING,
    },
  });

  return vote;
};
