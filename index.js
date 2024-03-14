const express = require("express");
const PORT = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const diccionario = JSON.parse(fs.readFileSync('tokipona.json', 'utf8'));
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



let messages = [];


app.post('/mensaje', (req, res) => {
    const { mensaje } = req.body;
    if (!mensaje) {
        return res.status(400).json({ status: 'error', message: 'Mensaje no proporcionado' });
    }

    messages.push(mensaje);

   
    fs.writeFile('messages.json', JSON.stringify(messages), (err) => {
        if (err) {
            console.error('Error al guardar mensajes en el archivo JSON:', err);
            return res.status(500).json({ status: 'error', message: 'Error al guardar el mensaje' });
        }
        console.log('Mensaje guardado correctamente');
        res.json({ status: 'success', message: 'Mensaje guardado correctamente' });
    });
});


app.get('/mensajes', (req, res) => {
    res.json({ mensajes: messages, status: 'success' });
});


app.get('/mensaje/:id', (req, res) => {
    const messageId = req.params.id;
    if (messageId >= 0 && messageId < messages.length) {
        res.json({ mensaje: messages[messageId], status: 'success' });
    } else {
        res.status(404).json({ status: 'error', message: 'Mensaje no encontrado' });
    }
});


app.get('/', (req, res) => {
    let form = `
        <form action="/mensaje" method="post">
            <label for="mensaje">Mensaje:</label>
            <input type="text" id="mensaje" name="mensaje" required>
            <button type="submit">Enviar</button>
        </form>
        <br>
        <h2>Mensajes almacenados:</h2>
        <ul>
    `;
    messages.forEach((message, index) => {
        form += `<li>${index + 1}: ${message}</li>`;
    });
    form += `</ul>`;
    res.send(form);
});
app.get('/saludo', (req, res) => {
    const nombre = req.query.nombre;
    res.send(nombre ? `Hola ${nombre}!` : 'Hola!');
  });
  app.get('/random', (req, res) => {
    const randomNumber = Math.random(); 
    const randomBoolean = Math.random() < 0.5; 
    const randomRange100 = Math.floor(Math.random() * 101); 
    const randomRange255 = Math.floor(Math.random() * 256); 

    const respuestaObjeto = {
        randomNumber: randomNumber,
        randomBoolean: randomBoolean,
        randomRangeEntre100: randomRange100,
        randomRangeEntre255: randomRange255
    };

    res.json(respuestaObjeto);
});
app.get('/fecha', (req, res) => {
    const fecha = new Date().toLocaleDateString();
    res.send(`Fecha Actual: ${fecha}`);
});

function to1337Speak(text) {
    return text.replace(/[aeostlzbgq]/gi, function(match) {
        switch(match.toLowerCase()) {
            case 'a':
                return '4';
            case 'e':
                return '3';
            case 'o':
                return '0';
            case 's':
                return '5';
            case 't':
                return '7';
            case 'l':
                return '1';
            case 'z':
                return '2';
            case 'b':
                return '8';
            case 'g':
                return '9';
            case 'q':
                return '9';
        }
    });
}


app.get('/1337', (req, res) => {
    const mensaje = req.query.mensaje;
    if (!mensaje) {
        return res.status(400).send('Mensaje no proporcionado');
    }
    const mensaje1337 = to1337Speak(mensaje);
    res.send(mensaje1337);
});

app.get('/diccionario/:palabra', (req, res) => {
    const palabra = req.params.palabra.toLowerCase();
    const traduccion = diccionario[palabra] ?? [];

    res.json({ esp: palabra,
         tokipona: traduccion });
});
// Inicializar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

 


