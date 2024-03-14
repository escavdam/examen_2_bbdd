const fs = require("fs")

function getAll() {
    const mensaje = require("../script/mensaje.js")
    return mensaje
}

function add(mensaje,autor) {
    const mensaje = getAll()
    mensaje.push({ author, mensaje})
    fs.writeFileSync("./script/mensaje.json", JSON.stringify(mensaje, null, 2))
}

function reset() {
    fs.writeFileSync("./script/mensaje.json", "[]")
}

module.exports ={
    getAll,
    add,
    reset,
}