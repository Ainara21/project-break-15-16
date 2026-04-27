const express = require("express");
const {
  showProducts,
  showProductById,
  showDashboard,
  showDashboardProductById,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct,
  apiGetProducts,
  apiGetProductById,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct
} = require("../controllers/productController");

const router = express.Router();

router.get("/", (req, res) => res.redirect("/products"));

router.get("/products", showProducts);
router.get("/products/:productId", showProductById);

router.get("/dashboard", showDashboard);
router.get("/dashboard/new", showNewProduct);
router.post("/dashboard", createProduct);
router.get("/dashboard/:productId", showDashboardProductById);
router.get("/dashboard/:productId/edit", showEditProduct);
router.put("/dashboard/:productId", updateProduct);
router.delete("/dashboard/:productId/delete", deleteProduct);

router.get("/api/products", apiGetProducts);
router.get("/api/products/:productId", apiGetProductById);
router.post("/api/products", apiCreateProduct);
router.put("/api/products/:productId", apiUpdateProduct);
router.delete("/api/products/:productId", apiDeleteProduct);

module.exports = router;
