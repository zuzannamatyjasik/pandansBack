const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/users");

router.post("/signup", UserController.user_sign_up);

router.post("/login", UserController.user_login);

router.post("/check", UserController.check_token);

module.exports = router;
