const express = require("express");
const routers = express.Router();
const lista = ["1", "2", "3"];

routers.get("/hola", (req, res) => {
  res.send("<p>hola todos</p>");
});

routers.get("/testnjk", (req, res) => {
  res.render("test", { mensaje: "Hola mundo", lista: lista });
});

module.exports = routers;