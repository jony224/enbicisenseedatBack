/*
Este archivo recibe las peticiones del cliente y llama al método 
correspondiente en el controlador.
*/

const express = require('express');

const { body } = require('express-validator');

//Se instancia el controlador
const paseosController = require('../controllers/paseos');

const auth = require('../middleware/auth');

const router = express.Router();


//Recuperar todos los paseos
router.get('/',  auth,   paseosController.fetchAll);

router.get('/:userId',   paseosController.fetchOne);
//Añadir un paseo
router.post(
    '/',
    [
         auth, 
        body('fecha').trim().not().isEmpty(),
        body('recogida').trim().not().isEmpty(),
        body('recogidaVehiculo').trim().not().isEmpty(),
        body('vehiculos_id').trim().not().isEmpty(),
        body('beneficiario').trim().not().isEmpty(),
        body('usuarios_id').trim().not().isEmpty()
    ],
    paseosController.postPaseo
);

router.put('/asistenciaSi', auth, paseosController.cambiarAsistenciaSi);
router.put('/asistenciaNo', auth, paseosController.cambiarAsistenciaNo);

//Eliminar un paseo
router.delete('/:id',  auth,  paseosController.deletePaseo);

module.exports = router;