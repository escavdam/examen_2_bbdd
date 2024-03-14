const fs = require("fs");
const path = require("path");


function getAll() {
  const mensajes = require("../db/mensajes.json");
  return mensajes;
}


function add(mensaje, autor) {
  const mensajes = getAll();
  mensajes.push({ mensaje });
  fs.writeFileSync("./db/mensajes.json", JSON.stringify(mensajes, null, 2));
}


function createList() {
  const lista = getAll();
  let html = ""
  lista.forEach((item)=>{
    html += ` ${item.mensaje}</p>`
  })
  return html
}



function getIdList(id) {

  const mensajesPath = path.join(__dirname, "../db/mensajes.json");
  const mensajesData = fs.readFileSync(mensajesPath, "utf8");
  const mensajes = JSON.parse(mensajesData);

  const mensaje = mensajes[id];

  return mensaje;
}




module.exports = {
  getAll,
  add,
  createList,
  getIdList
};