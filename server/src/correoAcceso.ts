import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
var email = require("emailjs/email");
console.log("hola");

module.exports = (formulario: any) => {
    const token : string = jwt.sign(formulario.correo, process.env.TOKEN_SECRET || 'prueba');
    console.log(formulario)
var server = email.server.connect(
    {
        user: "ingeneria.computacion.utm@gmail.com",
        password: "faqsfrxelnubiioe",
        host: "smtp.gmail.com",
        ssl: true,
    });
var message: any = {};
message = {
    from: "erik@gmail.com",
    to: formulario.correo,
    bcc: "",
    subject: "Probando ando",
    attachment: [
        { data: `Recupera tu contrasena de la plataforma de donacion
        <a href="http://localhost:4200/recuperacion/${token}" >ACEPTAR</a>
        <br><br>
        `, alternative: true }
    ]
};
 console.log(message)
server.send(message, function (err: any, message: any) { console.log(err); });
}