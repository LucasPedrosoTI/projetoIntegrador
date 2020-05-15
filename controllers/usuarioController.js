const bcrypt = require("bcrypt");
const { Usuario } = require("../models");

module.exports = {
  cadastrar: async (req, res) => {
    let { nome, sobrenome, email, senha } = req.body;

    let hash = bcrypt.hashSync(senha, 10);

    try {
      // create a new user with the password hash from bcrypt
      await Usuario.create({
        nome,
        sobrenome,
        email,
        senha: hash,
      });

      return res.redirect("/login");
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  logar: async (req, res) => {
    let { email, senha, logado } = req.body;

    try {
      let users = await Usuario.findAll();

      let user = users.find(
        (user) => user.email == email && bcrypt.compareSync(senha, user.senha)
      );

      if (!user) {
        return res.render("login", { error: "Usuário/Senha inválido" });
      }

      req.session.usuario = user;

      res.locals.user = user;

      if (logado != undefined) {
        res.cookie("logado", user.email, { maxAge: 3600000 });
      }

      res.redirect("/dashboard-usuario");
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.clearCookie("logado");
    //res.cookie("logado", { expires: Date.now() });
    res.redirect("/login");
  },
};
