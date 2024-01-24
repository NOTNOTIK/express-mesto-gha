const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const ERROR_CODE = 400;
const SERVER_ERROR = 500;
const ERROR_NOT_FOUND = 404;
const OK = 200;
const CREATED_OK = 201;
const auth = require("./middlewares/auth");
const { celebrate, Joi } = require("celebrate");
const NotFoundError = require("./errors/NotFoundError.js"); // 404
module.exports = {
  ERROR_CODE,
  SERVER_ERROR,
  ERROR_NOT_FOUND,
  OK,
  CREATED_OK,
};

const { login, createUser } = require("./controllers/users");
mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  }),
  createUser
);

app.use(auth);
app.use("/cards", require("./routes/cards"));
app.use("/users", require("./routes/users"));

app.use("*", (req, res, next) => {
  return next(new NotFoundError("Страница не найдена"));
});
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({
    message: status === 500 ? "Ошибка сервера" : message,
  });
  next();
});
app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});
