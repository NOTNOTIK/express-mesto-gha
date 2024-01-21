const userRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");
userRouter.get("/", getUsers);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateUserAvatar);
module.exports = userRouter;
