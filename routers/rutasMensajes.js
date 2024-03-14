const express = require('express')
const fs = require('fs')
const moment = require('moment')
const { getAll, add, dic } = require("../scripts/mensajes.js");

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
//Hola!
routers.get("/saludo", (req, res) =>{
    const nombre = req.query.nombre
    if (nombre) {
        res.send(`¡Bienvenido, ${nombre}!`);
    } else {
        res.send('Bienvenido!');
    }
});

//¿Que día es hoy?
routers.get("/fecha", (req, res) => {
    const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss');
    res.send(`La fecha actual es: ${fechaActual}`);
});

//Diccionario toki pona > español
routers.get("/diccionario/:palabra", (req, res) =>{
    const diccionario = dic();
    const palabra = req.params.palabra
    if (palabra in diccionario) {
        res.send({
            esp: diccionario[palabra],
            tokipona: [palabra] 
        });
    } else {
        res.send({ error: 'La palabra no se encontró en el diccionario' });
    }
});

//Random
function randomNumber() {
    return Math.random();
}
function randomBoolean() {
    return Math.random() < 0.5;
}
function randomRange100() {
    return Math.floor(Math.random() * 101);
}
function randomRange255() {
    return Math.floor(Math.random() * 256); 
}

routers.get("/random", (req, res) => {
    const valoresAleatorios = {
        randomNumber: randomNumber(),
        randomBoolean: randomBoolean(),
        randomRange100: randomRange100(),
        randomRange255: randomRange255(),
    }

    res.json(valoresAleatorios);
});



module.exports = routers;

