const User = require("../models/user");

// Все пользователи
module.exports.getUsers = (req, res) => {
  User.find(
    {},
    {
      _id: 1,
      name: 1,
      about: 1,
      avatar: 1,
    }
  )
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Произошла ошибка при получении списка пользователей. Подробнее: ${err.message}`,
      });
    });
};

// Пользователь по ID
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId, {
    _id: 1,
    name: 1,
    about: 1,
    avatar: 1,
  })
    .orFail()
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: "Передан некорректный ID",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(404).send({
          message: "Пользователь с таким ID не найден",
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
      }
    });
};

// Создаем пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Невалидные данные при создании пользователя",
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
      }
    });
};

// Обновление профиля
module.exports.updateUser = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Невалидные данные при обновлении пользователя",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(404).send({
          message: "Пользователь с таким ID не найден",
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
      }
    });
};

// Обновление аватара
module.exports.updateUserAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    owner,
    { avatar },
    { new: true, runValidators: true, select: { avatar } }
  )
    .orFail()
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Невалидные данные при обновлении аватара пользователя",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(404).send({
          message: "Пользователь с таким ID не найден",
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
      }
    });
};

/*const User = require("../models/user");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "На сервере произошла ошибка" });
  }
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: "Передан некорректный ID",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(404).send({
          message: "Пользователь с таким ID не найден",
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({
          message: "Невалидные данные при создании пользователя",
        });
      } else {
        return res.status(500).json({
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
    return res.status(200).send(user);
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
*/
