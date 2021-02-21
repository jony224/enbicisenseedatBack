const db = require('../util/database');

module.exports = class Vehiculo {
    constructor(estado, localizacion){
        this.estado = estado;
        this.localizacion = localizacion;
    }

    static fetchAll(){
        return db.execute('SELECT * FROM vehiculos');
    }

    static save(vehiculo){
        return db.execute(
            'INSERT INTO vehiculos (estado, localizacion) VALUES (?, ?)', 
            [vehiculo.estado, vehiculo.localizacion]
        );
    }

    static deleteVehiculo(id){
        return db.execute('DELETE FROM vehiculos WHERE id = ?', [id]);

    }
};
