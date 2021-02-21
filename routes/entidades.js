/*
Este archivo recibe las peticiones del cliente y llama al método 
correspondiente en el controlador.
*/

const express = require('express');

const { body } = require('express-validator');

//Se instancia el controlador
const entidadesController = require('../controllers/entidades');

const auth = require('../middleware/auth');

const router = express.Router();


//Recuperar todas las entidades
router.get('/',  auth,   entidadesController.fetchAll);

//Añadir un vehículo
router.post(
    '/',
    [
         auth, 
        body('nombre').trim().not().isEmpty(),
        body('tipo').trim().not().isEmpty()
    ],
    entidadesController.postEntidad
);

//Eliminar un vehículo
router.delete('/:id',  auth,  entidadesController.deleteEntidad);

module.exports = router;