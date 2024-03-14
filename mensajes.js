const fs = require("fs");

function getAll() {
    const mensajes = require("./mensajes.json"); 
    return mensajes;
  }


function add(mensaje) {
    const mensajes = getAll();
    mensajes.push({ mensaje });
    fs.writeFileSync("./db/mensajes.json", JSON.stringify(mensajes, null, 2));
  }


  module.exports = {
    getAll,
    add
  }