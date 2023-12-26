const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "658aaa5016dc87f3d706d694",
  };
  next();
}); //
app.use("/cards", require("./routes/cards"));
app.use("/users", require("./routes/users"));

app.listen(3000, () => {
  console.log(`listening on port ${3000}`);
});
