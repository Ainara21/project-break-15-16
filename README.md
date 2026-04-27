# Tienda de ropa

Este proyecto es una tienda de ropa hecha con **Node.js**, **Express** y **MongoDB Atlas**. La idea era montar un catálogo de productos con una vista pública y, además, un pequeño dashboard para poder subir, editar y eliminar artículos.

He intentado dejarlo bastante claro y ordenado para que se entienda bien la estructura y para que luego sea más fácil continuar con el despliegue.

## Qué incluye

- Catálogo de productos
- Vista de detalle de cada producto
- Dashboard de administración
- Formulario para crear productos
- Formulario para editar productos
- Eliminación de productos
- API en JSON para productos

## Tecnologías usadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- method-override

## Estructura del proyecto

```txt
Project Break 1516
├── config
│   └── db.js
├── controllers
│   └── productController.js
├── helpers
│   ├── baseHtml.js
│   ├── getNavBar.js
│   └── template.js
├── models
│   └── Product.js
├── public
│   └── styles.css
├── routes
│   └── productRoutes.js
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Variables de entorno

Hay que crear un archivo `.env` con algo parecido a esto:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb_atlas
```

## Cómo ponerlo en marcha

1. Entrar en la carpeta del proyecto
2. Instalar dependencias
3. Añadir la URI de MongoDB Atlas en el `.env`
4. Arrancar el servidor

```bash
npm install
npm start
```

Por defecto la aplicación se levanta en:

```txt
http://localhost:3000
```

## Rutas principales en HTML

- `GET /products` -> muestra todos los productos
- `GET /products/:productId` -> muestra el detalle de un producto
- `GET /dashboard` -> muestra el dashboard con todos los productos
- `GET /dashboard/new` -> formulario para crear un producto
- `POST /dashboard` -> crea un producto
- `GET /dashboard/:productId` -> detalle de producto dentro del dashboard
- `GET /dashboard/:productId/edit` -> formulario de edición
- `PUT /dashboard/:productId` -> actualiza un producto
- `DELETE /dashboard/:productId/delete` -> elimina un producto

## API JSON

Como en el enunciado aparece el bonus de la API como obligatorio, también he dejado rutas JSON:

- `GET /api/products`
- `GET /api/products/:productId`
- `POST /api/products`
- `PUT /api/products/:productId`
- `DELETE /api/products/:productId`

## Modelo de producto

Cada producto tiene estos campos:

- `name`
- `description`
- `image`
- `category`
- `size`
- `price`

## Notas

- Para las operaciones `PUT` y `DELETE` desde formularios se usa `method-override`
- Las vistas se generan con template literals
- Las imágenes se guardan como URL en la base de datos
- En el campo de imagen conviene usar una URL directa, porque los enlaces de Google Images suelen fallar

## Siguiente paso

Lo siguiente sería conectar una base de datos real de Atlas y después desplegar el proyecto en Render con las variables de entorno correspondientes.
