const express = require("express");
const app = express();

app.disable("x-powered-by");
app.use((req, res, next) => {
  res.set({
    "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'; form-action 'none'",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Cache-Control": "no-store",
  });
  next();
});

const total = (precio, cant, desc) =>
  precio * cant * (1 - desc);

app.get("/total", (req, res) => {
  const { p, c } = req.query;
  res.json({ total: total(p, c, 0) });
});

app.get("/calcular", (req, res) => {
  const resultado = Number(req.query.a) + Number(req.query.b);
  res.json({ resultado });
});

app.use((req, res) => {
  res.status(404).json({ error: "no encontrado" });
});

module.exports = { app, total };

if (require.main === module) app.listen(3000);
