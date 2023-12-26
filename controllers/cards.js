const Card = require("../models/card");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      res.status(404).send({ message: "Карточки с таким ID нет" });
      return;
    }
    res.send({ message: "Карточка удалена" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(201).send(card);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    res.send(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: err.message });
    } else {
      res.status(404).send({ message: "Произошла ошибка" });
    }
    res.status(500).send({ message: "На сервере произошла ошибка" });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.send(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: err.message });
    } else {
      res.status(404).send({ message: "Произошла ошибка" });
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
