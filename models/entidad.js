const db = require('../util/database');

module.exports = class Entidad {
    constructor(nombre, tipo){
        this.nombre = nombre;
        this.tipo = tipo;
    }

    static fetchAll(){
        return db.execute('SELECT e.*, t.nombre as tipoNombre FROM entidades e INNER JOIN tiposentidad t ON e.tiposentidad_id = t.id');
    }
   
    static save(entidad){
        return db.execute(
            'INSERT INTO entidades (nombre, tiposentidad_id) VALUES (?, ?)', 
            [entidad.nombre, entidad.tipo]
        );
    }

    static deleteEntidad(id){
        return db.execute('DELETE FROM entidades WHERE id = ?', [id]);

    }
};
