const { Usuario, Usuario_Posto } = require("../models");

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

  if (req.cookies.postoLogado != undefined && req.session.posto == null) {
    let email = req.cookies.postoLogado;

    let user = await Usuario_Posto.findOne({
      where: {
        email,
      },
    });

    if (user.email == email) {
      req.session.posto = user;
    }
  }

  next();
};

module.exports = cookieLogin;
