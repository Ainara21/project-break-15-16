const getProductCards = (products, basePath) => {
  if (!products.length) {
    return '<p class="empty-state">Todavía no hay productos disponibles.</p>';
  }

  return `
    <section class="product-grid">
      ${products
        .map(
          (product) => `
            <article class="product-card">
              <img src="${product.image}" alt="${product.name}" />
              <div class="product-card-body">
                <span class="product-badge">${product.category}</span>
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div class="product-meta">
                  <span>Talla: ${product.size}</span>
                  <strong>${product.price.toFixed(2)} €</strong>
                </div>
                <a class="button-link" href="${basePath}/${product._id}">Ver detalle</a>
              </div>
            </article>
          `
        )
        .join("")}
    </section>
  `;
};

const getProductDetail = (product, isDashboard = false) => `
  <section class="detail-card">
    <img src="${product.image}" alt="${product.name}" class="detail-image" />
    <div class="detail-body">
      <p class="product-badge">${product.category}</p>
      <h1>${product.name}</h1>
      <p>${product.description}</p>
      <p><strong>Talla:</strong> ${product.size}</p>
      <p><strong>Precio:</strong> ${product.price.toFixed(2)} €</p>
      ${
        isDashboard
          ? `
            <div class="dashboard-actions">
              <a class="button-link" href="/dashboard/${product._id}/edit">Editar</a>
              <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
                <button class="danger-button" type="submit">Eliminar</button>
              </form>
            </div>
          `
          : `<a class="button-link" href="/products">Volver al catalogo</a>`
      }
    </div>
  </section>
`;

const getProductForm = ({ product = null, action, method = "POST", title }) => `
  <section class="form-wrapper">
    <h1>${title}</h1>
    <form class="product-form" action="${method === "PUT" ? `${action}?_method=PUT` : action}" method="POST">
      <label>
        Nombre
        <input type="text" name="name" value="${product?.name || ""}" required />
      </label>
      <label>
        Descripción
        <textarea name="description" rows="4" required>${product?.description || ""}</textarea>
      </label>
      <label>
        Imagen
        <input type="text" name="image" value="${product?.image || ""}" placeholder="Pega aqui la URL de la imagen" required />
        <small class="field-help">Usa una URL directa de imagen, por ejemplo .jpg, .png o una URL estable de Unsplash o Cloudinary. Los enlaces de Google Images suelen fallar.</small>
      </label>
      <label>
        Categoría
        <select name="category" required>
          ${["Camisetas", "Pantalones", "Zapatos", "Accesorios"]
            .map(
              (category) =>
                `<option value="${category}" ${product?.category === category ? "selected" : ""}>${category}</option>`
            )
            .join("")}
        </select>
      </label>
      <label>
        Talla
        <select name="size" required>
          ${["XS", "S", "M", "L", "XL"]
            .map(
              (size) =>
                `<option value="${size}" ${product?.size === size ? "selected" : ""}>${size}</option>`
            )
            .join("")}
        </select>
      </label>
      <label>
        Precio
        <input type="number" min="0" step="0.01" name="price" value="${product?.price || ""}" required />
      </label>
      <button class="submit-button" type="submit">Guardar producto</button>
    </form>
  </section>
`;

module.exports = {
  getProductCards,
  getProductDetail,
  getProductForm
};
