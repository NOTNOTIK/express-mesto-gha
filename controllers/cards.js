const Card = require("../models/card");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (err) {
    return res.status(500).json({ message: "На сервере произошла ошибка" });
  }
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .orFail()
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: "Некорректный ID для удаления карточки",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(404).send({
          message: "Карточка с таким ID не найдена",
        });
      } else {
        res.status(500).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
      }
    });
};
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).json(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({
        message: "Невалидные данные при создании карточки",
      });
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};

//Я не понимаю, почему оно не проходит автотесты, почему мне вылетает ошибка 400 а не 404. хелп
module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    return res.json(card);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Uncorrect ID" });
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
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Uncorrect ID" });
    } else {
      return res.status(500).json({ message: "На сервере произошла ошибка" });
    }
  }
};
