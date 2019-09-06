const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

const localConfig = require('./local.config').config;

let url = "smtps://" + localConfig.emailUsername + "%40" + localConfig.emailDomain
    + ":" + encodeURIComponent(localConfig.password)
    + "@smtp." + localConfig.emailDomain + ":" + localConfig.smtpPort;
let transporter = nodemailer.createTransport(url);

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        let remetente = localConfig.clientName + ' <' + localConfig.emailUsername + '@' + localConfig.emailDomain + '>';

        let assunto = req.body['assunto'];
        let destinatarios = req.body['destinatarios']; // lista de e-mails destinatarios separados por ,
        let corpo = req.body['corpo'];
        let corpoHtml = req.body['corpoHtml'];

        let email = {
            from: remetente,
            to: destinatarios,
            subject: assunto,
            text: corpo,
            html: corpoHtml
        };

        transporter.sendMail(email, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).send('Mensagem ' + info.messageId + ' enviada: ' + info.response);
        });
    });
});

/*
 ***********************************************************
 *** Tutorial at: https://medium.com/@adsonrocha/como-enviar-e-mails-usando-cloud-functions-do-firebase-com-o-nodemailer-5c8bf6d9f8e8
 ***********************************************************
 */
