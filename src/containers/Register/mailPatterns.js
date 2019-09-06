exports.accessCodePlain = (name, accessCode) => {
    let names = name.split(' ');
    if (names.length > 1) {
        name = names[0] + ' ' + names[1];
    }
    return (
        "Olá " + name + "." +
        "Seu cadastro no Access Code App foi efetuado com sucesso. " +
        "O seu código de acesso é: " +
        accessCode + ". " +
        "Atenção: O código de acesso é pessoal e intransferível. Não deixe que outras pessoas tenham acesso a ele. " +
        "Utilize o seu código de acesso para acessar o sistema pelo link: " +
        "https://access-code-app.web.app/auth"
    )
}
exports.accessCodeHtml = (name, accessCode) => {
    let names = name.split(' ');
    if (names.length > 1) {
        name = names[0] + ' ' + names[1];
    }
    return (
        "<div style='font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif; -webkit-font-smoothing: antialiased;'>" +
            "<div style='width: 400px; height: auto; margin: 10px auto 10px auto; padding: 20px; font-weight: 200; font-size: 18px; text-align: center;'>" +
                "<p>Olá " + name + ".</p>" +
                "<p>Seu cadastro no Access Code App foi efetuado com sucesso.</p>" +
                "<p>O seu código de acesso é:</p>" +
                "<h1 style='font-weight: 400; font-size: 42px; color: #006b6b'>" + accessCode + "</h1>" +
                "<p>" +
                    "Atenção: O código de acesso é pessoal e intransferível. " +
                    "Não deixe que outras pessoas tenham acesso a ele. " +
                "</p>" +
                "<p>Utilize o seu código de acesso para acessar o sistema pelo link abaixo:</p>" +
                "<p>" +
                "<a href='https://access-code-app.web.app/auth'>https://access-code-app.web.app/auth</a>" +
                "</p>" +
            "</div>" +
        "</div>"
    )
}