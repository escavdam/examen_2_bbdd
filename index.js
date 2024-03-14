const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const {getAll, add, createList, dic} = require ("./mensajes")
nunjucks.configure("views", {
    autoescape: true,
    express: app,
   });
   app.set('view engine', 'njk')
   app.use(express.urlencoded({ extended: true }))
   const routers = require("./rutasDeLosMensajes");
   app.use(routers);
   app.get('/holamundo',(req,res) => {
     res.send("hola mundo")
   }); 

   app.get("/diccionario/:palabra", (req, res)=> {
    const palabra = req.params.palabra
    const diccionario = dic();
    res.json({"esp":diccionario[palabra],
    "tokipona": palabra
})

    console.log(diccionario["akesi"])
   })

   app.get("/random", (req, res) =>{
    const randomNumber = Math.random();
    const randomNumber100 = Math.floor(Math.random()*100)
    const randomNumber255 = Math.floor(Math.random()*255)
    const randomNumberBoolean = Math.random < 0.5;

    const listaRandoms = {
        randomNumberNormal: randomNumber,
        randomNumberPor100: randomNumber100,
        randomNumberPor255: randomNumber255,
        randomNumberBooleano: randomNumberBoolean
    }

    res.json(listaRandoms)

});

// app.get(`/`, (req, res) => {
//     res.send(`Funciono`)
// })

app.get('/fecha', (req, res) => {
    const fecha = new Date().toLocaleDateString();
    res.send(`Fecha Actual: ${fecha}`);
});

app.get('/saludo', (req, res) => {
    const nombre = req.query.nombre;
       res.send(nombre ? `Hola ${nombre}!` : 'Hola!');
  });


app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
    });