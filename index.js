const express = require('express')
const app = express()

app.get("/saludo", (req, res) => {
    res.send("hola")
})

app.listen(3000, () => console.log('Server open in port 3000')) 

