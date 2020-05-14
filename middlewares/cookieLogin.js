const { Usuario } = require("../models");

const cookieLogin = async (req, res, next) => {
  if (req.cookies.logado != undefined && req.session.usuario == null) {
    let cookieUsername = req.cookies.logado;

    let usuarios = await Usuario.findAll();

    let user = usuarios.find((user) => user.email == cookieUsername);

    if (user.email == cookieUsername) {
      req.session.usuario = user;
    }
  }

  next();
};

module.exports = cookieLogin;
