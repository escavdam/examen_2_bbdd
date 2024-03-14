
const express = require("express");
const nunjucks = require("nunjucks");
const fs = require('fs');
const { getAll } = require("./scripts/mensajes.js");
 

const app = express();
 

nunjucks.configure("views", {
   autoescape: true,
   express: app,
 });
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: true }))
 

const rutasMensajes = require("./routers/rutasMensajes.js");
app.use(rutasMensajes);
 
//HOLA! Ruta Saludo

app.get('/saludo', (req, res) => {
    const nombre = req.query.nombre;
    res.send(nombre ? `Hola ${nombre}!` : 'Hola!');
  });
  
//Random Ruta Números Random

app.get('/random', (req, res) => {
    const randomNumber = Math.random(); 
    const randomBoolean = Math.random() < 0.5; 
    const randomRange100 = Math.floor(Math.random() * 101); 
    const randomRange255 = Math.floor(Math.random() * 256); 

    const respuesta = {
        randomNumber: randomNumber,
        randomBoolean: randomBoolean,
        randomRange100: randomRange100,
        randomRange255: randomRange255
    };

    res.json(respuesta);
});

//¿Qué día es hoy? Ruta Fecha

  app.get('/fecha', (req, res) => {
    const fecha = new Date().toLocaleDateString();
    res.send(`Fecha Actual: ${fecha}`);
});

//1337C0D3 Ruta 1337

app.get('/1337', (req, res) => {
    const mensajeOriginal = req.query.mensaje;
    const textoLeet = toLeetSpeak(mensajeOriginal);
  
    res.send(`LeetCode: ${textoLeet}`);
  });
  
  function toLeetSpeak(str) {
    let leetText = ''; 
  
    const chars = str.split('');
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] === 'a' || chars[i] === 'A') {
            leetText += '4';
        } else if (chars[i] === 'e' || chars[i] === 'E') {
            leetText += '3';
        } else if (chars[i] === 'i' || chars[i] === 'I') {
            leetText += '1';
        } else if (chars[i] === 'o' || chars[i] === 'O') {
            leetText += '0';
        } else if (chars[i] === 's' || chars[i] === 'S') {
            leetText += '5';
        } else if (chars[i] === 't' || chars[i] === 'T') {
            leetText += '7';
        } else if (chars[i] === 'l' || chars[i] === 'L') {
            leetText += '1';
        } else if (chars[i] === 'z' || chars[i] === 'Z') {
            leetText += '2';
        } else if (chars[i] === 'b' || chars[i] === 'B') {
            leetText += '8';
        } else if (chars[i] === 'g' || chars[i] === 'G') {
            leetText += '9';
        } else if (chars[i] === 'q' || chars[i] === 'Q') {
            leetText += '9';
        } else {
            leetText += chars[i]; 
        }
    }
    return leetText;
  }

  //Diccionario: toki pona > español

  const diccionario = JSON.parse(fs.readFileSync('tokipona.json', 'utf8'));

  app.get('/diccionario/:palabra', (req, res) => {
    const palabra = req.params.palabra.toLowerCase();
    const traduccion = diccionario[palabra] ?? [];

    res.json({ español: palabra,
         tokipona: traduccion });
});


 app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
    });
 