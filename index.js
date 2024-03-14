//importaciones
const express = require('express');
const nunjucks = require('nunjucks');

//crear la app
const app = express();

//njk
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: true }))

const rutasMensajes = require("./routers/rutasMensajes.js");
app.use(rutasMensajes);

//arrancar servidor
app.listen(3000, () =>{
    console.log('Servidor corriendo en http://localhost:3000')
});
