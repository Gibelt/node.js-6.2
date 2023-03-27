const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const loggerOne = require("./middlewares/loggerOne");

dotenv.config();

const { API_URL, PORT, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    throw err;
  });

const app = express();

app.use(cors());
app.use(loggerOne);
app.use(bodyParser.json());
app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер - ${API_URL}:${PORT}`);
});
