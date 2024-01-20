const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/DbConfig.js");
const Vote = require("./Vote.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  port: dbConfig.port,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./User.js")(sequelize, DataTypes);
db.vote = require("./Vote.js")(sequelize, DataTypes);
db.poll = require("./Poll.js")(sequelize, DataTypes);
db.questions = require("./Questions.js")(sequelize, DataTypes);
db.analytics = require("./Analytics.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes sync done!");
});

// poll to questions
db.poll.hasMany(db.questions, {
  foreignKey: "poll_id",
  as: "questions",
});

db.questions.belongsTo(db.poll, {
  foreignKey: "poll_id",
  as: "polls",
});

// user to questions

db.user.belongsToMany(db.questions, { through: db.vote });
db.questions.belongsToMany(db.user, { through: db.vote });

//  vote to questions
db.vote.hasMany(db.questions, {
  foreignKey: "vote_id",
  as: "questions",
});
db.questions.belongsTo(db.vote, {
  foreignKey: "vote_id",
  as: "vote",
});

// poll to analytics
db.poll.hasOne(db.analytics, {
  foreignKey: "poll_id",
  as: "analytics",
});
db.analytics.belongsTo(db.poll, { foreignKey: "poll_id", as: "poll" });

module.exports = db;
