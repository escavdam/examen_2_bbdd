const express = require('express')
const fs = require('fs')
const { getAll, add } = require("../scripts/mensajes.js");

const routers = express.Router();

routers.get("/", (req, res) => {
    const lista = getAll();
    res.render("mensajes", { lista });
});

routers.get("/mensajes", (req, res) => {
    res.json(getAll());
});

routers.post("/mensaje", (req, res) => {
    const { mensaje } = req.body;
    if (mensaje === "") {
        res.json({
          status: "error",
          mensaje: "Debes ingresar un mensaje",
        });
        return;
    }
    add(mensaje);
    res.json({ status: "succes", mensaje: "Mensaje agregado" });
});

routers.get("/mensaje/:id", (req, res) =>{
    const lista = getAll();
    const mensajeId = req.params.id
    res.send(lista[mensajeId])
});

//segunda parte del examen
routers.get("/saludo", (req, res) =>{
    const nombre = req.query.nombre
    if (nombre) {
        res.send(`¡Bienvenido, ${nombre}!`);
    } else {
        res.send('Bienvenido!');
    }
});



module.exports = routers;

