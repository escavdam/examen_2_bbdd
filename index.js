const express = require("express");
const app = express();

app.post()


app.get('/fecha', (req, res) => {
    const fecha = new Date().toLocaleDateString();
    res.send(`Fecha Actual: ${fecha}`);
});

app.get('/hola', (req, res) => {
    res.send(`Hola`);
  });

  

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
    });