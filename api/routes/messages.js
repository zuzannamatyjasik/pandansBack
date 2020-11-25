const express = require("express");
const router = express.Router();
const multer = require("multer");

const MessagesController = require("../controllers/messages.js");
const checkAuth = require("../middleware/check-auth");

//pobierz liste wiadomości
router.get("/", checkAuth, MessagesController.messages_get_all);

//dodaj nową wiadomość
router.post("/", MessagesController.messages_add_new);

//pobierz pojedynczą wiadomość
router.get("/:messageId", checkAuth, MessagesController.messages_get_message);

//usun pojedynczą wiadomość
router.delete("/:messageId", checkAuth, MessagesController.messages_delete);

module.exports = router;
