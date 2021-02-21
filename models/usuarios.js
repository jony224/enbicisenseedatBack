const db = require('../util/database');
module.exports = class Usuario {
    constructor(name, email, nivel, telefono, roles_id, entidades_id){
        this.name = name;
        this.email = email;
        this.telefono = telefono;
        this.nivel = nivel;
        this.roles_id = roles_id;
        this.entidades_id = entidades_id;
    }

    static find(email){
        return db.execute('SELECT * FROM usuarios WHERE email = ?', [email] );
    }
    //Recuperar Todos
    static fetchAllVoluntarios(){
        return db.execute('SELECT * FROM usuarios WHERE roles_id = 2');
    }

    static fetchAllCoordinadores(){
        return db.execute('SELECT * FROM usuarios WHERE roles_id = 1');
    }

    static fetchAllBeneficiarios(){
        return db.execute('SELECT u.*, e.nombre as entidadNombre FROM usuarios u INNER JOIN entidades e ON u.entidades_id = e.id WHERE u.roles_id = 3 ');
    }

    //Añadir
    static saveVoluntario(usuario){
        return db.execute(
            'INSERT INTO usuarios (nombre, email, telefono, nivel, roles_id, entidades_id) VALUES (?, ?, ?, ?, 2, 2)', 
            [usuario.name, usuario.email, usuario.telefono, usuario.nivel]
        );
    }

    static saveCoordinador(usuario){
        return db.execute(
            'INSERT INTO usuarios (nombre, email, telefono, roles_id, entidades_id) VALUES (?, ?, ?,  1, 2)', 
            [usuario.name, usuario.email, usuario.telefono]
        );
    }

    static saveBeneficiario(usuario){
        return db.execute(
            'INSERT INTO usuarios (nombre, email, telefono, roles_id, entidades_id) VALUES (?, ?, ?, 3, ?)', 
            [usuario.name, usuario.email, usuario.telefono, usuario.entidades_id]
        );
    }

    //Eliminar
    static deleteUsuario(id){
        return db.execute('DELETE FROM usuarios WHERE id = ?', [id]);

    }
    
    //Modificar

    static cambiarNivelVoluntario(usuario){
        return db.execute('UPDATE usuarios SET nivel = ? WHERE id = ?', [usuario.nivel, usuario.id]);
    }
};
