const express = require("express");
const router = express.Router();
const multer = require("multer");

const ShopController = require("../controllers/shops.js");
const checkAuth = require("../middleware/check-auth");

//pobierz liste sklepów
router.get("/", ShopController.shops_get_all);

//dodaj nowy sklep
router.post("/", checkAuth, ShopController.shops_add_new);

//pobierz pojedynczy sklep
router.get("/:shopId", ShopController.shops_get_shop);

//zmien pojedynczy sklep
router.patch("/:shopId", checkAuth, ShopController.shops_update);

//usun pojedynczy sklep
router.delete("/:shopId", checkAuth, ShopController.shops_delete);

module.exports = router;
