const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const validator = require("validator");
const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Неправильная ссылка",
      },
      required: true,
    },
    owner: {
      type: ObjectId,
      required: true,
      ref: "user",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("card", cardSchema);
