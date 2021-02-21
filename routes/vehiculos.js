/*
Este archivo recibe las peticiones del cliente y llama al método 
correspondiente en el controlador.
*/

const express = require('express');

const { body } = require('express-validator');

//Se instancia el controlador
const vehiculosController = require('../controllers/vehiculos');

const auth = require('../middleware/auth');

const router = express.Router();


//Recuperar todos los vehículos
router.get('/', auth, vehiculosController.fetchAll);

//Añadir un vehículo
router.post(
    '/',
    [
         auth, 
        body('estado').trim().not().isEmpty(),
        body('localizacion').trim().not().isEmpty()
    ],
    vehiculosController.postVehiculo
);

//Eliminar un vehículo
router.delete('/:id',  auth,  vehiculosController.deleteVehiculo);

module.exports = router;