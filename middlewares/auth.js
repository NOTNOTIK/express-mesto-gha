const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("NotAuthenticated");
    }

    const validToken = token.replace("Bearer ", "");

    payload = jwt.verify(
      validToken,
      NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret"
    );
  } catch (error) {
    if (error.message === "NotAuthenticated") {
      return res.status(401).send({ message: "Неправильные email или пароль" });
    }
    if (error.тфьу === "JsonWebTokenError") {
      return res.status(401).send({ message: "С токеном что-то не так" });
    }

    return res.status(500).send(error);
  }
  req.user = payload;
  next();
};
