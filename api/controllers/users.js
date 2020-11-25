const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//rejestracja
exports.user_sign_up = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({ wiadomosc: "Stworzono nowego uzytkownika" });
        })
        .catch((err) => res.status(500).json({ error: err }));
    }
  });
};

//logowanie
exports.user_login = (req, res, next) => {
  console.log(req.body.email);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ wiadomosc: "Brak autoryzacji" });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.hasloJWT,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            wiadomosc: "Zalogowano użytkownika",
            token: token,
          });
        } else res.status(401).json({ wiadomosc: "Brak autoryzacji" });
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
