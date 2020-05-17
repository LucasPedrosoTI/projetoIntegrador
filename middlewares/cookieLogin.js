const { Usuario } = require("../models");

const cookieLogin = async (req, res, next) => {
  if (req.cookies.logado != undefined && req.session.usuario == null) {
    let email = req.cookies.logado;

    let user = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (user.email == email) {
      req.session.usuario = user;
    }
  }

  next();
};

module.exports = cookieLogin;
