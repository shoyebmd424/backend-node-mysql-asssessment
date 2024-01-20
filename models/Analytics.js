module.exports = (sequelize, DataTypes) => {
  const Analytics = sequelize.define("Analytics", {
    totalVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    optionCounts: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
  });
  return Analytics;
};
