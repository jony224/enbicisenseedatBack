const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secretfortoken')


    } catch (err) {
        const error = new Error('Datos incorrectos');
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    necesitaAuth = true;
    if (req.method == 'POST') {
        if (req.path == '/voluntario') {
            necesitaAuth = false;
        }
    }
    if (req.method == 'PUT') {
        if (req.path == '/asistenciaSi' || req.path == '/asistenciaNo') {
            necesitaAuth = false;
        }
    }
    if (necesitaAuth) {
        if (decodedToken.role != 'admin') {
            const error = new Error('No tienes suficientes permisos.');
            error.statusCode = 401;
            throw error;
        }
    }

    req.isloggedIn = true;
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
}