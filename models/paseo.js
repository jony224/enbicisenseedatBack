const db = require('../util/database');

module.exports = class Paseo {
    constructor(fecha, recogida, vehiculos_id, usuarios_id, beneficiario){
        this.fecha = fecha;
        this.recogida = recogida;
        this.vehiculos_id = vehiculos_id;
        this.usuarios_id = usuarios_id;
        this.beneficiario = beneficiario;
    }

    static fetchAll(){
        return db.execute('SELECT p.*, u.nombre as nombreVoluntario, e.nombre as nombreBeneficiario FROM paseos p, usuarios u, entidades e WHERE p.usuarios_id = u.id AND p.beneficiario = e.nombre');
    }

    static fetchOne(userId){
        return db.execute(`SELECT p.*, u.nombre as nombreVoluntario, e.nombre as nombreBeneficiario FROM paseos p, usuarios u, entidades e WHERE p.usuarios_id = u.id AND p.beneficiario = e.nombre AND u.id = (SELECT u3.id FROM usuarios u3 WHERE u3.email = (SELECT u4.email FROM users u4 WHERE u4.id = ${userId}))`);
    }

    static save(paseo){
        return db.execute(
            'INSERT INTO paseos (fecha, recogida, vehiculos_id, usuarios_id, beneficiario, recogidaVehiculo) VALUES (?, ?, ?, ?, ?, ?)', 
            [paseo.fecha, paseo.recogida, paseo.vehiculos_id, paseo.usuarios_id, paseo.beneficiario, paseo.recogidaVehiculo]
        );
    }

    static deletePaseo(id){
        return db.execute('DELETE FROM paseos WHERE id = ?', [id]);

    }

    static cambiarAsistenciaSi(datos){
        return db.execute('UPDATE paseos SET asistencia = 1 WHERE id = ?', [datos.id]);
    }

    static cambiarAsistenciaNo(datos){
        return db.execute('UPDATE paseos SET asistencia = 2 WHERE id = ?', [datos.id]);
    }
};
