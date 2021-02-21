/*
Este archivo es llamado por el routes.js y segun la funcion que se le mande 
ejecutar, llama al método correspondiente en el modelo y devuelve una 
respuesta
*/

const { validationResult } = require('express-validator');

//Se instancia el modelo
const Entidad = require('../models/entidad');

//Recuperar todos los vehículos
exports.fetchAll = async (req, res, next) => {
    try {
        const [allEntidad] = await Entidad.fetchAll();
        res.status(200).json(allEntidad);
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
    const tipo = req.body.tipo;

    try {
        const entidad = {
            nombre: nombre,
            tipo: tipo
        }

        const result = await Entidad.save(entidad);

        res.status(201).json({ message: 'Entidad registrada correctamente' });
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
        const deleteResponse = await Entidad.deleteEntidad(req.params.id);
        res.status(200).json({deleteResponse, message: 'Entidad eliminada correctamente'});
    } catch (err) {
        if(err.message.includes('Cannot delete or update a parent row:')){
            err.message = 'No se puede eliminar una entidad asignada a un usuario.'
        }
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}