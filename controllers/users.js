const { OK, SERVER_ERROR, ERROR_CODE, ERROR_NOT_FOUND } = require("../app");
const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(OK).json(users);
  } catch (err) {
    return res
      .status(SERVER_ERROR)
      .json({ message: "На сервере произошла ошибка" });
  }
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      return res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_CODE).send({
          message: "Передан некорректный ID",
        });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_NOT_FOUND).send({
          message: "Пользователь с таким ID не найден",
        });
      } else {
        return res
          .status(SERVER_ERROR)
          .json({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      return res.status(OK).json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE).json({
          message: "Невалидные данные при создании пользователя",
        });
      } else {
        return res
          .status(SERVER_ERROR)
          .json({ message: "На сервере произошла ошибка" });
      }
    });
};
module.exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: "true", runValidators: true }
    );
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(ERROR_CODE).json({ message: "Невалидные данные" });
    } else if (err.name === "DocumentNotFoundError") {
      return res.status(ERROR_NOT_FOUND).json({ message: "ID not found" });
    } else {
      return res
        .status(SERVER_ERROR)
        .json({ message: "На сервере произошла ошибка" });
    }
  }
};

module.exports.updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: "true", runValidators: true }
    );
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(ERROR_CODE).json({ message: "Невалидные данные" });
    } else if (err.name === "DocumentNotFoundError") {
      return res.status(ERROR_NOT_FOUND).json({ message: "ID not found" });
    } else {
      return res
        .status(SERVER_ERROR)
        .json({ message: "На сервере произошла ошибка" });
    }
  }
};
