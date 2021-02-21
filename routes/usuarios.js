/*
Este archivo recibe las peticiones del cliente y llama al método 
correspondiente en el controlador.
*/

const express = require('express');

const { body } = require('express-validator');

//Se instancia el controlador
const usuariosController = require('../controllers/usuarios');

const auth = require('../middleware/auth');

const router = express.Router();

//3 tipos de usuario -> Voluntario, Coordinador y Beneficiario
//Los mismos métodos para cada tipo
//Recuperar todos los 
router.get('/voluntarios',  auth,  usuariosController.fetchAllVoluntarios);

router.get('/coordinadores',  auth,  usuariosController.fetchAllCoordinadores);

router.get('/beneficiarios',  auth,  usuariosController.fetchAllBeneficiarios);

//Añadir un usuario
router.post('/voluntario',
    [ auth,  body('name').trim().not().isEmpty(), body('email').trim().not().isEmpty().isEmail(), body('telefono').trim().not().isEmpty(), body('nivel').not().isEmpty()],
    usuariosController.postVoluntario
);

router.post('/coordinador',
    [ auth,  body('name').trim().not().isEmpty(), body('email').trim().not().isEmpty().isEmail(), body('telefono').trim().not().isEmpty()],
    usuariosController.postCoordinador
);

router.post('/beneficiario',
    [ auth,  body('name').trim().not().isEmpty(), body('email').trim().not().isEmpty().isEmail(), body('telefono').trim().not().isEmpty(), body('entidad').not().isEmpty()],
    usuariosController.postBeneficiario
);

//Eliminar un usuario
//Como no importa el rol, solo hace falta una función
router.delete('/:id',  auth,  usuariosController.deleteUsuario);

//Cambiar nivel usuario
router.put('/nivel', auth, usuariosController.cambiarNivelVoluntario);
module.exports = router;