const express = require("express");
const {
  uploadNotification,
  getAllNotification,
} = require("../controller/Notification.Controller");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("notificationPdf"), uploadNotification);
router.get("/all", getAllNotification);

module.exports = router;
