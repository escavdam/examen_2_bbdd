// importaciones
const express = require("express");
const nunjucks = require("nunjucks");
const { getAll } = require("./scripts/mensajes.js"); 
const fs = require('fs'); 

// crear app
const app = express();

// njk
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set('view engine', 'njk');
app.use(express.urlencoded({ extended: true }));

// rutas
const rutasMensajes = require("./routers/rutasMensajes.js"); // Assuming rutasMensajes defines additional routes
app.use(rutasMensajes);

let messages = [];

app.get('/holamundo', (req, res) => {
  res.send("hola mundo");
});

app.get('/hola', (req, res) => {
  const nombre = req.query.nombre;
  res.send(nombre ? `Hola ${nombre}!` : 'Hola!');
});

app.get('/fecha', (req, res) => {
  const fecha = new Date().toLocaleDateString();
  res.send(`Fecha Actual: ${fecha}`);
});

app.get('/random', (req, res) => {
    const randomNumber = Math.random();
    const randomBoolean = Math.random() >= 0.5;
    const randomRange100 = Math.floor(Math.random() * 100);
    const randomRange255 = Math.floor(Math.random() * 256);
  
    const response = {
      randomNumber,

      randomBoolean,

      randomRange100,

      randomRange255,

    };
  
    res.json(response);
  });

app.get('/leet', (req, res) => {
  const palabra = req.query.palabra;

  const convertirALeet = (word) => {
    const leetMap = {
      'a': '4',
      'e': '3',
      'l': '1',
      'o': '0',
      't': '7',
      's': '5',
      'z': '2',
      'b': '8',
      'g': '9',
      'q': '9'
    };

    return word.split('').map(char => leetMap[char.toLowerCase()] || char).join('');
  };

  const palabraLeet = convertirALeet(palabra);
  res.send(`Versión Leet: ${palabraLeet}`);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});