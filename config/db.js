const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Falta la variable MONGO_URI en el archivo .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error al conectar la base de datos:", error.message);
  }
};

module.exports = connectDB;
