var express = require('express');
var router = express.Router();
const customerController = new customerController

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Final Taller de Programación' });
});


//ENDPOINT
//1. Obtener cliente por mail
const path = "customer"
router.get(`/${path}`, customerController.obtenerCliente(mail))


module.exports = router;