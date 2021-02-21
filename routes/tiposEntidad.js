/*
Este archivo recibe las peticiones del cliente y llama al método 
correspondiente en el controlador.
*/

const express = require('express');

const { body } = require('express-validator');

//Se instancia el controlador
const tiposEntidadController = require('../controllers/tiposEntidad');

const auth = require('../middleware/auth');

const router = express.Router();


//Recuperar todas las entidades
router.get('/',  auth,   tiposEntidadController.fetchAll);

//Añadir un vehículo
router.post(
    '/',
    [
         auth, 
        body('nombre').trim().not().isEmpty(),
        body('tipo').trim().not().isEmpty()
    ],
    tiposEntidadController.postEntidad
);

//Eliminar un vehículo
router.delete('/:id',  auth,  tiposEntidadController.deleteEntidad);

module.exports = router;