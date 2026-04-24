const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Task API en écoute sur le port ${port}`);
});
