const { vote } = require(".");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Enter Name" },
      },
    },
  });
  //   user.hasMany(vote, {
  //     foreignKey: "user_id",
  //     as: "vote",
  //   });
  //   vote.belongsTo(user, {
  //     foreignKey: "user_id",
  //     as: "user",
  //   });
  return user;
};
