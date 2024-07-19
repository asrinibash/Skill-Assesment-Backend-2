const mongoose = require("mongoose");

async function makeDatabaseConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; 
  }
}

module.exports = makeDatabaseConnection;
