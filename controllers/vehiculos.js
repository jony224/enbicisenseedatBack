/*
Este archivo es llamado por el routes.js y segun la funcion que se le mande 
ejecutar, llama al método correspondiente en el modelo y devuelve una 
respuesta
*/

const { validationResult } = require('express-validator');

//Se instancia el modelo
const Vehiculo = require('../models/vehiculo');

//Recuperar todos los vehículos
exports.fetchAll = async (req, res, next) => {
    try {
        const [allVehiculos] = await Vehiculo.fetchAll();
        res.status(200).json(allVehiculos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Añadir un vehículo
exports.postVehiculo = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const estado = req.body.estado;
    const localizacion = req.body.localizacion;

    try {
        const vehiculo = {
            estado: estado,
            localizacion: localizacion
        }

        const result = await Vehiculo.save(vehiculo);

        res.status(201).json({ message: 'Vehiculo registrado correctamente' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Eliminar un vehículo
exports.deleteVehiculo = async (req, res, next) => {
    try {
        const deleteResponse = await Vehiculo.deleteVehiculo(req.params.id);
        res.status(200).json({deleteResponse, message: 'Vehiculo eliminado correctamente'});
    } catch (err) {
        if(err.message.includes('Cannot delete or update a parent row:')){
            err.message = 'No se puede eliminar un vehículo asignado a un paseo.'
        }
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}