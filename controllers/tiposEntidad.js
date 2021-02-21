/*
Este archivo es llamado por el routes.js y segun la funcion que se le mande 
ejecutar, llama al método correspondiente en el modelo y devuelve una 
respuesta
*/

const { validationResult } = require('express-validator');

//Se instancia el modelo
const TipoEntidad = require('../models/tipoEntidad');

//Recuperar todos los vehículos
exports.fetchAll = async (req, res, next) => {
    try {
        const [allTipoEntidad] = await TipoEntidad.fetchAll();
        res.status(200).json(allTipoEntidad);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Añadir un vehículo
exports.postEntidad = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const nombre = req.body.nombre;

    try {
        const tipoEntidad = {
            nombre: nombre
        }

        const result = await TipoEntidad.save(tipoEntidad);

        res.status(201).json({ message: 'Tipo entidad registrada correctamente' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Eliminar un vehículo
exports.deleteEntidad = async (req, res, next) => {
    try {
        const deleteResponse = await TipoEntidad.deleteTipoEntidad(req.params.id);
        res.status(200).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}