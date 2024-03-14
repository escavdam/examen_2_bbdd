const express = require('express')
const moment = require('moment')
const app = express()

app.get('/saludo', (req, res) => {
    const { nombre } = req.query
    res.send(`holla ${nombre}`)
})

app.get('/random', (req, res) => {
    const randomNumber = Math.floor(Math.random()*1)
    let boolean
    if(randomNumber > 0.5){
        boolean = true
    }
    else{
        boolean = false
    }
    const randomRange100 = Math.floor(Math.random()*100)
    const randomRange255 = Math.floor(Math.random()*255)
    const miobjeto = {
        randomNumber,
        boolean,
        randomRange100,
        randomRange255
    }
    res.json(miobjeto)
})

app.get('/fecha', (req, res) =>{
    const tiempo = moment().format('MMMM Do YYYY, h:mm:ss a')
    res.send(tiempo)
})

app.get('/1337', (req, res) => {
    const mensaje = req.query.mensaje
    const leet = mensaje.split("")

    for(let i = 0; i <= leet.length; i++ ) {
        console.log(leet[i])
        if (leet[i] === "e") {
            leet[i] = "3"
        }
        if (leet[i] === "a") {
            leet[i] = "4"
        }
        if (leet[i] === "o") {
            leet[i] = "0"
        }
        if (leet[i] === "s") {
            leet[i] = "5"
        }
        if (leet[i] === "t") {
            leet[i] = "7"
        }
        if (leet[i] === "l") {
            leet[i] = "1"
        }
        if (leet[i] === "z") {
            leet[i] = "2"
        }
        if (leet[i] === "b") {
            leet[i] = "8"
        }
        if (leet[i] === "g") {
            leet[i] = "9"
        }
        if (leet[i] === "q") {
            leet[i] = "9"
        }
    }

    const reformed = leet.join("")

    res.send(reformed)
})

app.get ('/tokipona', (req, res) =>{
    const palabra = req.query.palabra
    diccionario = require("./tokipona.json")
    console.log(diccionario.a)
    const palabraEligido = diccionario[palabra]
    
    res.send(palabraEligido)
})

app.listen(3000, () => console.log('Server open in port 3000')) 