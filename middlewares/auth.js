const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let payload;

  try {
    const token = req.header.params.authorization;
    if (!token) {
      throw new Error("NotAuthorized");
    }
    const validToken = token.replace("Bearer ", "");
    payload = jwt.verify(validToken, "super-strong-secret");
  } catch (err) {
    if (err.message === "NotAuthorized") {
      return res.status(401).send({ message: "Неправильные email или пароль" });
    }
    if (err.message === "JsonWebTokenError") {
      return res.status(401).send({ message: "с токеном что-то не так" });
    }
    return res.status(500).send(err);
  }
  req.user = payload;
  next();
};
