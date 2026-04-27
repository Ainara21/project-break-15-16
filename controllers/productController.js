const Product = require("../models/Product");
const baseHtml = require("../helpers/baseHtml");
const getNavBar = require("../helpers/getNavBar");
const {
  getProductCards,
  getProductDetail,
  getProductForm
} = require("../helpers/template");

const showProducts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    const html = baseHtml({
      title: "Catálogo de ropa",
      nav: getNavBar(false),
      content: `
        <section class="hero">
          <h1>Tienda de ropa</h1>
          <p>Catálogo de productos disponible para la tienda.</p>
        </section>
        ${getProductCards(products, "/products")}
      `
    });

    res.send(html);
  } catch (error) {
    res.status(500).send("<h1>Error al cargar los productos</h1>");
  }
};

const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).send("<h1>Producto no encontrado</h1>");
    }

    const html = baseHtml({
      title: product.name,
      nav: getNavBar(false),
      content: getProductDetail(product, false)
    });

    res.send(html);
  } catch (error) {
    res.status(500).send("<h1>Error al cargar el producto</h1>");
  }
};

const showDashboard = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    const html = baseHtml({
      title: "Dashboard",
      nav: getNavBar(true),
      content: `
        <section class="hero">
          <h1>Dashboard de administración</h1>
          <p>Aquí puedes ver, editar y eliminar los productos subidos.</p>
        </section>
        ${getProductCards(products, "/dashboard")}
      `
    });

    res.send(html);
  } catch (error) {
    res.status(500).send("<h1>Error al cargar el dashboard</h1>");
  }
};

const showDashboardProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).send("<h1>Producto no encontrado</h1>");
    }

    const html = baseHtml({
      title: `${product.name} | Dashboard`,
      nav: getNavBar(true),
      content: getProductDetail(product, true)
    });

    res.send(html);
  } catch (error) {
    res.status(500).send("<h1>Error al cargar el producto del dashboard</h1>");
  }
};

const showNewProduct = async (req, res) => {
  const html = baseHtml({
    title: "Nuevo producto",
    nav: getNavBar(true),
    content: getProductForm({
      action: "/dashboard",
      title: "Subir nuevo artículo"
    })
  });

  res.send(html);
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      size: req.body.size,
      price: Number(req.body.price)
    });

    res.redirect(`/dashboard/${newProduct._id}`);
  } catch (error) {
    res.status(400).send("<h1>No se ha podido crear el producto</h1>");
  }
};

const showEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).send("<h1>Producto no encontrado</h1>");
    }

    const html = baseHtml({
      title: "Editar producto",
      nav: getNavBar(true),
      content: getProductForm({
        product,
        action: `/dashboard/${product._id}`,
        method: "PUT",
        title: "Editar artículo"
      })
    });

    res.send(html);
  } catch (error) {
    res.status(500).send("<h1>Error al cargar el formulario de edición</h1>");
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        size: req.body.size,
        price: Number(req.body.price)
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).send("<h1>Producto no encontrado</h1>");
    }

    res.redirect(`/dashboard/${updatedProduct._id}`);
  } catch (error) {
    res.status(400).send("<h1>No se ha podido actualizar el producto</h1>");
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect("/dashboard");
  } catch (error) {
    res.status(500).send("<h1>No se ha podido eliminar el producto</h1>");
  }
};

const apiGetProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

const apiGetProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

const apiCreateProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el producto", error: error.message });
  }
};

const apiUpdateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el producto", error: error.message });
  }
};

const apiDeleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

module.exports = {
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
};
