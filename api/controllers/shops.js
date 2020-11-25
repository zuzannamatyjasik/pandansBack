const mongoose = require("mongoose");
const Shop = require("../models/shop.js");

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
  let categories = req.body.category.split(' ');
    const shop = new Shop({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
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
        wiadomosc: "Dodano nowy produkt",
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

//pobierz pojedynczy sklep
exports.shops_get_shop = (req, res, next) => {
  const id = req.params.shopId;
  Shop.findById(id)
    .save()
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
  Shop.findByIdAndUpdate(id, {
    name: req.body.name,
    bio: req.body.bio,
    category: req.body.category,
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
