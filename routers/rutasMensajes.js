const express = require("express");
const fs = require("fs");
const routers = express.Router();
const { getAll, add, createList, getIdList } = require("../scripts/mensajes.js");

routers.get("/", (req, res) => {
  const lista = getAll();
  res.render("mensajes", { lista });
});

routers.get("/mensajes", (req, res) => {
  res.json(getAll());
});

routers.get("/mensajes/html", (req, res) => {
  const html = createList();
  res.send(html);
});

routers.post("/mensajes", (req, res) => {
  const { mensaje } = req.body;
  if (mensaje === "") {
    res.json({
      status: "error",
      mensaje: "Debes ingresar un mensaje",
    });
    return;
  }
  add(mensaje);
  res.json({ status: "ok", mensaje: "Mensaje agregado correctamente" });
});

routers.get("/mensaje/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  const mensaje = getIdList(id);

  res.send(mensaje);
});

module.exports = routers;