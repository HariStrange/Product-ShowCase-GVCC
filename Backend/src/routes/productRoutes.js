const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);

module.exports = router;
