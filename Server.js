const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const PollRoutes = require("./routes/PollRoutes");
const QuestionRoutes = require("./routes/QuestionRoutes");
dotenv.config();

const port = process.env.PORT || 8888;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/poll", PollRoutes);
app.use("/question", QuestionRoutes);

app.use((req, res, next) => {
  const err = new Error(`${req.url} not found in this server`);
  err.status = 404;
  if (err) {
    res.status(404).send({
      success: false,
      message: "url not found please type right url",
    });
  }
  next();
});

app.listen(port, () => {
  //   Connection();
  console.log(`Server is running on port ${port}`);
});
