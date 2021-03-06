require('express-async-errors')
const config = require("./utils/config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");


const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB", mongoUrl);
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", notesRouter);
app.use("/api/users", usersRouter);

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;
