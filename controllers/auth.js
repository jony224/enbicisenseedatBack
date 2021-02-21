const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.find(email);

        if (user[0].length > 0) {
            const error = new Error('Ya existe un usuario con este mail.');
            console.log(error);
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const userDetails = {
            name: name,
            email: email,
            password: hashedPassword
        }

        const result = await User.save(userDetails);

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.find(email);
        if (user[0].length !== 1) {
            const error = new Error('Los datos introducidos son incorrectos!');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];

        const isEqual = await bcrypt.compare(password, storedUser.password);
        if (!isEqual) {
            const error = new Error('Los datos introducidos son incorrectos!')
            error.statusCode = 401;
            throw error;
        }
        //Cookie
        const token = jwt.sign(
            {
                email: storedUser.email,
                userId: storedUser.id,
                role: storedUser.role
            },
            'secretfortoken',
            { expiresIn: '1h' }
        )

        res.status(200).json({token: token, userId: storedUser.id, roleUser: storedUser.role})

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.changePass = async (req, res, next) => {
    try{

        const password1 = req.body.password1;
        const newPassword = req.body.newPassword;
        const email = req.body.email;
        console.log(email);
        const user = await User.find(email);

        if (user[0].length !== 1) {
            const error = new Error('El email introducido no existe!');
            error.statusCode = 401;
            throw error;
        }

        const storedUser = user[0][0];
        const isEqual = await bcrypt.compare(password1, storedUser.password);

        if (!isEqual) {
            const error = new Error('La antigua contraseña no es correcta')
            error.statusCode = 401;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const result = await User.changePass(email, hashedPassword);
        res.status(201).json({ message: 'Contraseña cambiada correctamente' });
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}