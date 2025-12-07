const express = require("express");
const router = express.Router();

const adminAuthController = require("../controllers/adminAuthController");

router.post("/register", adminAuthController.createAdmin);
router.post("/login", adminAuthController.adminLogin);

module.exports = router;
