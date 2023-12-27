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
    if (!user) {
      return res
        .status(404)
        .send({ message: "Пользователь с таким ID не найден" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "На сервере произошла ошибка" });
  }
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json({ message: err.message }));
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
