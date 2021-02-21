var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'testenbicisenseedatjony@gmail.com',
        pass: '1234abcd$'
    }
});



exports.enviarmail = function(voluntario){
    try {
        var mailOptions = {
            from: 'testenbicisenseedatjony@gmail.com',
            to: voluntario.email,
            subject: 'Solicitud de voluntario para el programa EnBiciSenseEdat',
            text: `Hola ${voluntario.name},
            
            Tu solicitud para formar parte del voluntariado de EnBiciSenseEdat ha sido registrada correctamente`
        };
        
        
        response = 'Enviado Correctamente'
        /*transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return error.message;
            }
            return 'success';
        });*/
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}