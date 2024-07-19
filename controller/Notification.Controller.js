const Notification = require("../model/Notification");

const AWS = require("aws-sdk");
const { v4: uuidV4 } = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadNotification = async (req, res) => {
  const { heading, description } = req.body;
  const notificationPdf = req.file;

  if (!notificationPdf) {
    return res.status(400).send("No file uploaded");
  }

  const fileName = `${uuidV4()}-${notificationPdf.originalname}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: notificationPdf.buffer,
    ContentType: notificationPdf.mimetype,
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      return res.status(500).send("Error uploading file"+err);
    }

    const notification = new Notification({
      heading,
      description,
      notificationPdf: data.Location,
    });

    try {
      const savedNotification = await notification.save();
      res.status(201).json(savedNotification);
    } catch (error) {
      res.status(500).send("Error saving notification to database");
    }
  });
};

const getAllNotification = async (req, res) => {
  try {
    const notificationList = await Notification.find();
    res.status(200).json(notificationList);
  } catch (error) {
    res.status(500).send("Error fetching notifications" + error);
  }
};

module.exports = {
  uploadNotification,
  getAllNotification,
};
