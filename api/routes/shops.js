const express = require("express");
const router = express.Router();
const multer = require("multer");

const ShopController = require("../controllers/shops.js");
const checkAuth = require("../middleware/check-auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(req, file);
    cb(
      null,
      new Date().toISOString().replace(":", "_").replace(":", "_") +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetyoe === "image/jpeg" || file.mimetyoe == "image/png") {
    cb(null, true);
  } else cb(null, false);
};

// fileSize: 1024 * 1024 * 5
const upload = multer({
  storage: storage,
  fileSize: 1024 * 1024 * 5,
});

//pobierz liste sklepów
router.get("/", ShopController.shops_get_all);

//dodaj nowy sklep
router.post("/", upload.single("photo"), ShopController.shops_add_new);

//pobierz pojedynczy sklep
router.get("/:shopId", ShopController.shops_get_shop);
``;
//zmien pojedynczy sklep
router.patch(
  "/:shopId",
  checkAuth,
  upload.single("photo"),
  ShopController.shops_update
);

//usun pojedynczy sklep
router.delete("/:shopId", checkAuth, ShopController.shops_delete);

module.exports = router;
