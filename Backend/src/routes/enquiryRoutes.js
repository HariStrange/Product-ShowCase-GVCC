const express = require("express");
const router = express.Router();

const EnquiryController = require("../controllers/enquiriesController");

router.get("/", EnquiryController.getEnquiries);
router.post("/", EnquiryController.createEnquiry);

module.exports = router;
