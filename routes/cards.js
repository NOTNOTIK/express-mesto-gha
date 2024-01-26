const cardRouter = require("express").Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const { validationCard, v } = require("../middlewares/validation.js");

cardRouter.get("/", getCards);

cardRouter.delete("/:cardId", deleteCard);
cardRouter.post("/", validationCard, createCard);
cardRouter.put("/:cardId/likes", likeCard);
cardRouter.delete("/:cardId/likes", dislikeCard);
module.exports = cardRouter;
