const Card = require("../models/card");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (err) {
    if (err.message === "notFoundError") {
      return res.status(400).json(err.message);
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};
module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      return res.status(404).json({ message: "Карточки с таким ID нет" });
    }
    return res.json({ message: "Карточка удалена" });
  } catch (err) {
    if (err.message === "notFoundError") {
      return res.status(400).json(err.message);
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).json(card);
  } catch (err) {
    if (err.message === "notFoundError") {
      return res.status(400).json(err.message);
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};
module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    return res.json(card);
  } catch (err) {
    if (err.message === "notFoundError") {
      return res.status(400).json(err.message);
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    return res.json(card);
  } catch (err) {
    if (err.message === "notFoundError") {
      return res.status(400).json(err.message);
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
    return res.json(user);
  } catch (err) {
    if (err.message === "notFoundError") {
      return res.status(400).json(err.message);
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};
