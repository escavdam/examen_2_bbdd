const express = require("express");
const fs = require("fs");
const routers = express.Router();
const { getAll, add, reset, List, getId } = require("../scripts/mensajes.js");

routers.get("/", (req, res) => {
  const lista = getAll();
  res.render("mensajes", { lista });
});

routers.get("/mensajes", (req, res) => {
  res.json(getAll());
});

routers.get("/mensajes/html", (req, res) => {
  const html = List();
  res.send(html);
});

routers.post("/mensajes", (req, res) => {
  const { mensaje } = req.body;
  if (mensaje === "") {
    res.json({
      status: "error",
      mensaje: "Ingresa un mensaje",
    });
    return;
  }
  add(mensaje);
  res.json({ status: "ok", mensaje: "Mensaje agregado" });
});

routers.get("/mensajes/reset", (req, res) => {
  reset();
  res.json({ status: "ok", mensaje: "Mensajes eliminado" });
});

routers.get("/mensaje/:id", (req, res) => {
    const id = parseInt(req.params.id); 
    const mensajeId = getId(id); 
    res.send(mensajeId);
  });
  
module.exports = routers;