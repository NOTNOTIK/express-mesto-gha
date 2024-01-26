const userRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  getOneUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");
const {
  validationUserInfo,
  validationUserAvatar,
} = require("../middlewares/validation.js");
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.get("/me", getOneUser);
userRouter.patch("/me", validationUserInfo, updateUser);
userRouter.patch("/me/avatar", validationUserAvatar, updateUserAvatar);
module.exports = userRouter;
