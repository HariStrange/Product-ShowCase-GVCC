const express = require("express");
const router = express.Router();

const EnquiryController = require("../controllers/enquiriesController");
const { authMiddleWare } = require("../middlewares/authMiddleWare");

router.get("/", authMiddleWare, EnquiryController.getEnquiries);
router.post("/", EnquiryController.createEnquiry);

module.exports = router;
