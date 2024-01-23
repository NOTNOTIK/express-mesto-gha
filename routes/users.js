const userRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  getOneUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.get("/me", getOneUser);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateUserAvatar);
module.exports = userRouter;
