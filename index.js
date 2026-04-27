const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/", productRoutes);

app.use((req, res) => {
  res.status(404).send("<h1>Página no encontrada</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
