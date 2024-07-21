const express = require('express');
const dotenv = require('dotenv');
const notificationRoutes = require('./routes/NotificationRoutes');
const makeDatabaseConnection = require('./config/DatabaseConnection');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await makeDatabaseConnection();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
