const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  notificationPdf: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification; 
