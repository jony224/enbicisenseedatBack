/*
Este archivo es llamado por el routes.js y segun la funcion que se le mande 
ejecutar, llama al método correspondiente en el modelo y devuelve una 
respuesta
*/

const { validationResult } = require('express-validator');

//Se instancia el modelo
const Paseo = require('../models/paseo');

//Recuperar todos los paseos
exports.fetchAll = async (req, res, next) => {
    try {
        
        const [allPaseos] = await Paseo.fetchAll();
        console.log(allPaseos);
        res.status(200).json(allPaseos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.fetchOne = async (req, res, next) => {
    try {
        
        const [onePaseos] = await Paseo.fetchOne(req.params.userId);
        console.log(onePaseos);
        res.status(200).json(onePaseos);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

//Añadir un paseo
exports.postPaseo = async (req, res, next) => {
    const errors = validationResult(req);

    
    if (!errors.isEmpty()) return

    const fecha = req.body.fecha ;
    console.log(fecha);
    const recogida = req.body.recogida;
    const recogidaVehiculo = req.body.recogidaVehiculo;
    const vehiculos_id = req.body.vehiculos_id;
    const usuarios_id = req.body.usuarios_id;
    const beneficiario = req.body.beneficiario;

    try {
        const paseo = {
            fecha: fecha,
            recogida: recogida,
            recogidaVehiculo: recogidaVehiculo,
            vehiculos_id: vehiculos_id,
            usuarios_id: usuarios_id,
            beneficiario: beneficiario
        }
        console.log(paseo);

        const result = await Paseo.save(paseo);

        res.status(201).json({ message: 'Paseo registrado correctamente' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//Eliminar un paseo
exports.deletePaseo = async (req, res, next) => {
    try {
        const deleteResponse = await Paseo.deletePaseo(req.params.id);
        res.status(200).json({deleteResponse, message: 'Paseo eliminado correctamente'});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.cambiarAsistenciaSi = async (req, res, next) => {
    const id = req.body.id;
    
    try {
        const datos = {
            id: id
        }
        const response = await Paseo.cambiarAsistenciaSi(datos);
        res.status(200).json({response, message: 'Asistencia confirmada correctamente'});
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.cambiarAsistenciaNo = async (req, res, next) => {
    const id = req.body.id;
    
    try {
        const datos = {
            id: id
        }
        const response = await Paseo.cambiarAsistenciaNo(datos);
        res.status(200).json({response, message: 'Asistencia denegada correctamente'});
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}