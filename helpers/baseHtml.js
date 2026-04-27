const baseHtml = ({ title, nav = "", content = "" }) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    ${nav}
    <main class="page-content">
      ${content}
    </main>
  </body>
</html>
`;

module.exports = baseHtml;
