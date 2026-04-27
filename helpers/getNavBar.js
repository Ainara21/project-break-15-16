const categories = ["Todas", "Camisetas", "Pantalones", "Zapatos", "Accesorios"];

const getNavBar = (isDashboard = false) => {
  const categoryLinks = categories
    .map((category) => {
      if (category === "Todas") {
        return `<a href="/products">Todas</a>`;
      }

      return `<a href="/products?category=${encodeURIComponent(category)}">${category}</a>`;
    })
    .join("");

  return `
    <header class="navbar">
      <div class="brand">
        <a href="/products">Clothes Corner</a>
      </div>
      <nav class="nav-links">
        ${categoryLinks}
        <a href="/dashboard">Dashboard</a>
        ${isDashboard ? '<a href="/dashboard/new" class="button-link">Subir artículo</a>' : ""}
      </nav>
    </header>
  `;
};

module.exports = getNavBar;
