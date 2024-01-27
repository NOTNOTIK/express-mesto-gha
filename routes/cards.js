const cardRouter = require("express").Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const {
  validationCard,
  validationCardId,
} = require("../middlewares/validation.js");

cardRouter.get("/", getCards);

cardRouter.delete("/:cardId", validationCardId, deleteCard);
cardRouter.post("/", validationCard, createCard);
cardRouter.put("/:cardId/likes", validationCardId, likeCard);
cardRouter.delete("/:cardId/likes", validationCardId, dislikeCard);
module.exports = cardRouter;
