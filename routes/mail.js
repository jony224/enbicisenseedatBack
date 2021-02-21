/*
Este archivo recibe las peticiones del cliente y llama al método 
correspondiente en el controlador.
*/

const express = require('express');

const { body } = require('express-validator');

//Se instancia el controlador
const mailController = require('../controllers/mail');

const router = express.Router();


//Recuperar todas las entidades
router.get('/', /* auth,  */ mailController.enviarmail);

module.exports = router;