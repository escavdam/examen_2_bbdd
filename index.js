const express = require("express");
const nunjucks = require("nunjucks");
const { getAll } = require("./scripts/mensajes.js");
const fs = require("fs");

const app = express();

const diccionario = JSON.parse(fs.readFileSync('tokipona.json', 'utf-8'))

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: true }))

const rutasMensajes = require("./routers/rutasMensajes.js");
app.use(rutasMensajes);

app.get('/holamundo',(req,res) => {
  res.send("hola mundo")
}); 

app.get('/random', (req, res) => {
  const randomNumber = Math.random();
  const randomBoolean = Math.random() < 0.5;
  const randomRange100 = Math.floor(Math.random() * 100);
  const randomRange255 = Math.floor(Math.random() * 255);
  res.json({ 
    numero_random : randomNumber,
    booleano_random : randomBoolean,
    rango100_random : randomRange100,
    rango255_random : randomRange255,});
});

app.get('/saludo', (req, res) => {
  res.send(`!Hola ${req.query.nombre}!`);
});

app.get('/fecha', (req, res) => {
  res.send(`Fecha Actual: ${new Date().toLocaleDateString()}`);
});
  
app.get('/1337', (req, res) => {
  const palabra = req.query.palabra;


  const convertirALeet = (word) => {
    const leetMap = {
      'a': '4',
      'e': '3',
      'o': '0',
      's': '5',
      't': '7',
      'l': '1',
      'z': '2',
      'b': '8',
      'q': '9',
    };

    return word.split('').map(char => leetMap[char.toLowerCase()] || char).join('');
  };

  const palabraLeet = convertirALeet(palabra);
  res.send(`Versión Leet: ${palabraLeet}`);
});

app.get('/diccionario/:palabra', (req, res) => {
  const palabra = req.params.palabra.toLowerCase();
  const traduccion = diccionario[palabra] ?? [];

  res.json({ tokipona: palabra, español: traduccion });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});