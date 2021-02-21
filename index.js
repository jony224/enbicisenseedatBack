const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const vehiculosRoutes = require('./routes/vehiculos');

const usuariosRoutes = require('./routes/usuarios');

const entidadesRoutes = require('./routes/entidades');

const tiposEntidadRoutes = require('./routes/tiposEntidad');

const paseosRoutes = require('./routes/paseos');

const mailRoutes = require('./routes/mail');

const app = express();

const ports = process.env.PORT || 3050;

const errorController = require('./controllers/error');

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use('/vehiculos', vehiculosRoutes);

app.use('/usuarios', usuariosRoutes);

app.use('/entidades', entidadesRoutes);

app.use('/tiposEntidad', tiposEntidadRoutes);

app.use('/paseos', paseosRoutes);

app.use('/mail', mailRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening in port ${ports}`));

