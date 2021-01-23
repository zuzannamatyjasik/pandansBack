const express = require("express");
const morgan = require("morgan");
const monogoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());


const dbURL =
  "mongodb+srv://admin:" +
  process.env.hasloAtlasa +
  "@cluster0.lr9ey.mongodb.net/shops_database?retryWrites=true&w=majority";
monogoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("polaczono"))
  .catch((err) => console.log(err));

app.use(express.static("public"));

app.use(morgan("combined"));

app.use(bodyParser.json());

const shopRoutes = require("./api/routes/shops");
const messageRoutes = require("./api/routes/messages");
const userRoutes = require("./api/routes/users");

app.use("/shops", shopRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);


app.use((req, res, next) => {
  const error = new Error("Nie znaleziono");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    blad: {
      wiadomosc: error.message,
    },
  });
});

module.exports = app;
