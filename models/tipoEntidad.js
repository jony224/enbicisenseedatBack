const db = require('../util/database');

module.exports = class Entidad {
    constructor(estado){
        this.nombre = nombre;
    }

    static fetchAll(){
        return db.execute('SELECT * FROM tiposentidad');
    }
   
    static save(tiposEntidad){
        return db.execute(
            'INSERT INTO tiposentidad (nombre) VALUES ( ?)', 
            [entidad.nombre]
        );
    }

    static deleteTipoEntidad(id){
        return db.execute('DELETE FROM tiposentidad WHERE id = ?', [id]);

    }
};