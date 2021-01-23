const mongoose = require("mongoose");
const Shop = require("../models/shop.js");
var fs = require("fs");
var path = require("path");

//pobierz liste sklepów
exports.shops_get_all = (req, res, next) => {
  Shop.find()
    .then((docs) => {
      res.status(200).json({
        wiadomosc: "Lista wszystkich sklepów",
        info: docs,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

//dodaj nowy sklep
exports.shops_add_new = (req, res, next) => {
  console.log("ADDING NEW SHOW");
  let categories = req.body.category.split(",");
  const shop = new Shop({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    photo: {
      data: fs.readFileSync(
        path.join(__dirname + "/../../" + "/uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
    bio: req.body.bio,
    category: categories,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    website: req.body.website,
    followers: req.body.followers,
  });

  shop
    .save()
    .then((doc) => {
      res.status(201).json({
        wiadomosc: "Dodano nowy sklep",
        info: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

//pobierz pojedynczy sklep
exports.shops_get_shop = (req, res, next) => {
  console.log("getting show");
  const id = req.params.shopId;
  Shop.findById(id)
    .then((doc) => {
      res.status(200).json({
        wiadomosc: "Szczegoly sklepu " + id,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

//zmien pojedynczy sklep
exports.shops_update = (req, res, next) => {
  const id = req.params.shopId;
  let categories = req.body.category.split(",");
  Shop.findByIdAndUpdate(id, {
    name: req.body.name,
    bio: req.body.bio,
    photo: {
      data: fs.readFileSync(
        path.join(__dirname + "/../../" + "/uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
    category: categories,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    website: req.body.website,
    followers: req.body.followers,
  })
    .then((doc) => {
      res.status(200).json({
        wiadomosc: "Zmiana sklepu  " + id,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

//usun pojedynczy sklep
exports.shops_delete = (req, res, next) => {
  const id = req.params.shopId;
  Shop.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json({
        wiadomosc: "Usuniecie sklepu " + id,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
