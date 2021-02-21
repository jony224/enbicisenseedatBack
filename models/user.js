const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    static find(email){
        return db.execute('SELECT * FROM users WHERE email = ?', [email] );
    }

    static save(user){
        return db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [user.name, user.email, user.password]
        );
    }

    static changePass(email, newPassword){
        return db.execute('UPDATE users SET password = ? WHERE email = ?', [newPassword, email] );
    }
};
