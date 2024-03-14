const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
//const {getAll, add,createList} = require ("./mensajes")

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