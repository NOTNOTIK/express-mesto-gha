const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "На сервере произошла ошибка" });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "Uncorrect ID" });
    } else if (err.name === "DocumentNotFoundError") {
      return res.status(404).json({ message: "ID not found" });
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};
module.exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(() => {
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Невалидные данные при создании пользователя",
        });
      } else {
        return res.status(500).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
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
    return res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Uncorrect ID" });
    } else if (err.name === "NotFoundError") {
      return res.status(404).json({ message: "ID not found" });
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
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
    return res.send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Uncorrect ID" });
    } else if (err.name === "NotFoundError") {
      return res.status(404).json({ message: "ID not found" });
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};
