/*
Este archivo es llamado por el routes.js y segun la funcion que se le mande 
ejecutar, llama al método correspondiente en el modelo y devuelve una 
respuesta
*/

const { validationResult } = require('express-validator');

const mail = require('./mail');

//Se instancia el modelo
const Usuario = require('../models/usuarios');

//Recuperar todos los usuarios
exports.fetchAllVoluntarios = async (req, res, next) => {
    try {
        const [allVoluntarios] = await Usuario.fetchAllVoluntarios();
        res.status(200).json(allVoluntarios);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchAllCoordinadores = async (req, res, next) => {
    try {
        const [allCoordinadores] = await Usuario.fetchAllCoordinadores();
        res.status(200).json(allCoordinadores);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchAllBeneficiarios = async (req, res, next) => {
    try {
        const [allBeneficiarios] = await Usuario.fetchAllBeneficiarios();
        res.status(200).json(allBeneficiarios);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Añadir un voluntario
exports.postVoluntario = async (req, res, next) => {
    const errors = validationResult(req.body);

    console.log(req);
    if (!errors.isEmpty()) return
    const name = req.body.name;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const nivel = req.body.nivel;
    

    try {
        const usuario = await Usuario.find(email);
        if (usuario[0].length > 0) {
            const error = new Error('Ya existe un usuario con ese email');
            error.statusCode = 400;
            throw error;
        }

        const voluntario = {
            name: name,
            email: email,
            telefono: telefono,
            nivel: nivel
        }
        mail.enviarmail(voluntario);
        const result = await Usuario.saveVoluntario(voluntario);

        res.status(201).json({ message: 'Voluntario registrado correctamente' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Añadir un coordinador
exports.postCoordinador = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const name = req.body.name;
    const email = req.body.email;
    const telefono = req.body.telefono;

    try {

        const usuario = await Usuario.find(email);
        if (usuario[0].length > 0) {
            const error = new Error('Ya existe un usuario con ese email');
            error.statusCode = 400;
            throw error;
        }

        const coordinador = {
            name: name,
            email: email,
            telefono: telefono
        }

        const result = await Usuario.saveCoordinador(coordinador);

        res.status(201).json({ message: 'Coordinador registrado correctamente' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
//Añadir un beneficiario
exports.postBeneficiario = async (req, res, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const name = req.body.name;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const entidades_id = req.body.entidad;

    try {

        const usuario = await Usuario.find(email);
        if (usuario[0].length > 0) {
            const error = new Error('Ya existe un usuario con ese email');
            error.statusCode = 400;
            throw error;
        }
        const beneficiario = {
            name: name,
            email: email,
            telefono: telefono,
            entidades_id: entidades_id

        }

        const result = await Usuario.saveBeneficiario(beneficiario);

        res.status(201).json({ message: 'Beneficiario registrado correctamente' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Eliminar un usuario
exports.deleteUsuario = async (req, res, next) => {
    try {
        console.log(req.params.id);
        const deleteResponse = await Usuario.deleteUsuario(req.params.id);
        res.status(200).json({ deleteResponse, message: 'Usuario eliminado correctamente' });
    } catch (err) {
        if (err.message.includes('Cannot delete or update a parent row:')) {
            err.message = 'No se puede eliminar un voluntario asignado a un paseo.'
        }
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Modificar nivel de usuario
exports.cambiarNivelVoluntario = async (req, res, next) => {
    const id = req.body.id;
    const nivel = req.body.nivel;
    try {
        const usuario = {
            id: id,
            nivel: nivel
        }
        const response = await Usuario.cambiarNivelVoluntario(usuario);
        res.status(200).json({ response, message: 'Nivel modificado correctamente' });
    } catch (err) {

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}