const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
  } catch (err) {
    if (err.message === "notFoundError") {
      return res.status(404).send(err.message);
    } else {
      return res.status(500).send(err.message);
    }
  }
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: "true", runValidators: true }
    );
    res.send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: err.message });
    } else {
      res
        .status(404)
        .send({ message: "Пользователь по указанному ID не нйден" });
    }
    res.status(500).send({ message: "На сервере произошла ошибка" });
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
    res.send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: err.message });
    } else {
      res
        .status(404)
        .send({ message: "Пользователь по указанному ID не нйден" });
    }
    res.status(500).send({ message: "На сервере произошла ошибка" });
  }
};
