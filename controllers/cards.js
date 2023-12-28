const {
  OK,
  SERVER_ERROR,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  CREATED_OK,
} = require("../app");
const Card = require("../models/card");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(OK).json(cards);
  } catch (err) {
    return res
      .status(SERVER_ERROR)
      .json({ message: "На сервере произошла ошибка" });
  }
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      return res.status(OK).json(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_CODE).json({
          message: "Некорректный ID для удаления карточки",
        });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_NOT_FOUND).json({
          message: "Карточка с таким ID не найдена",
        });
      } else {
        return res
          .status(SERVER_ERROR)
          .json({ message: "На сервере произошла ошибка" });
      }
    });
};
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(CREATED_OK).json(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(ERROR_CODE).send({
        message: "Невалидные данные при создании карточки",
      });
    } else {
      return res
        .status(SERVER_ERROR)
        .json({ message: "На сервере произошла ошибка" });
    }
  }
};

//Я не понимаю, почему оно не проходит автотесты, почему мне вылетает ошибка 400 а не 404. хелп
module.exports.likeCard = async (req, res) => {
  /*try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    return res.status(OK).json(card);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(ERROR_CODE).send({
        message: "Некорректный ID",
      });
    } else if (err.name === "DocumentNotFoundError") {
      return res.status(ERROR_NOT_FOUND).send({
        message: "Карточка не найдена",
      });
    } else {
      return res
        .status(SERVER_ERROR)
        .json({ message: "На сервере произошла ошибка" });
    }
  }
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.status(200).send({
        data: card,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE).send({
          message: "Передан некорректный ID карточки",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_NOT_FOUND).send({
          message: "Карточка с таким ID не найдена",
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
      }
    });
    */
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    return res.status(OK).json(card);
  } catch (err) {
    if (err.name === "CastError") {
      res.status(ERROR_CODE).send({
        message: "Передан некорректный ID карточки",
      });
    } else if (err.name === "DocumentNotFoundError") {
      res.status(ERROR_NOT_FOUND).send({
        message: "Карточка с таким ID не найдена",
      });
    } else {
      return res
        .status(SERVER_ERROR)
        .json({ message: "На сервере произошла ошибка" });
    }
  }
};

module.exports.dislikeCard = async (req, res) => {
  /*try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    return res.status(OK).json(card);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(ERROR_CODE).send({
        message: "Некорректный ID",
      });
    } else if (err.name === "DocumentNotFoundError") {
      return res
        .status(ERROR_NOT_FOUND)
        .send({ message: "Карточка не найдена" });
    } else {
      return res
        .status(SERVER_ERROR)
        .json({ message: "На сервере произошла ошибка" });
    }
  }
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((card) => {
      res.status(OK).send({
        data: card,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_CODE).send({
          message: "Передан некорректный ID карточки",
        });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(ERROR_NOT_FOUND).send({
          message: "Карточка с таким ID не найдена",
        });
      } else {
        res.status(SERVER_ERROR).send({
          message: `Произошла ошибка. Подробнее: ${err.message}`,
        });
      }
    });*/

  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    return res.status(OK).json(card);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(ERROR_CODE).send({
        message: "Передан некорректный ID карточки",
      });
    } else if (err.name === "DocumentNotFoundError") {
      res.status(ERROR_NOT_FOUND).send({
        message: "Карточка с таким ID не найдена",
      });
    } else {
      return res
        .status(SERVER_ERROR)
        .json({ message: "На сервере произошла ошибка" });
    }
  }
};
