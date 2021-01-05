const mongoose = require("mongoose");
const Message = require("../models/message");

//pobierz liste wiadomości
exports.messages_get_all = (req, res, next) => {
  Message.find()
    .then((docs) => {
      res.status(200).json({
        wiadomosc: "Lista wszystkich wiadomości",
        info: docs.map((message) => {
          return {
            _id: message._id,
            name: message.name,
            title: message.title,
          };
        }),
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

//dodaj nową wiadomość
exports.messages_add_new = (req, res, next) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
    content: req.body.content,
  });

  message
    .save()
    .then((doc) => {
      res.status(201).json({
        wiadomosc: "Dodano nową wiadomość",
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

//pobierz pojedynczą wiadomość
exports.messages_get_message = (req, res, next) => {
  const id = req.params.messageId;
  Message.findById(id)
    .then((doc) => {
      res.status(200).json({
        wiadomosc: "Szczegoly wiadomości " + id,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

//usun pojedynczą wiadomość
exports.messages_delete = (req, res, next) => {
  const id = req.params.messageId;
  Message.findByIdAndDelete(id)
    .then((doc) => {
      res.status(200).json({
        wiadomosc: "Usuniecie wiadomości " + id,
        info: doc,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};
