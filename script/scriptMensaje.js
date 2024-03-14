const express = require("express")
const fs = require("fs")
const router = express.Router()
const { getAll, add, reset} = require

router.get("/", (req, res) => {
    const lista = getAll()
    res.render("mensaje", {lista})
})

router.get("/mensaje", (req, res) => {
    res.json(getAll())
})
router.post("/mensaje", (req, res) => {
    const { name, mensaje } = req.body
    console.log(name)
    if (name === "") {
      res.json({
        status: "error",
        mensaje: "You must have a name and a message",
      });
      return
    }
    add(mensaje, name)
    res.json({ status: "ok", mensaje: "Message added" })
  })
  
  router.get("/mensaje/reset", (req, res) => {
    reset()
    res.json({ status: "ok", mensaje: "Message deleted" })
  })
  
  module.exports = router
  