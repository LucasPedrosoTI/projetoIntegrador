const bcrypt = require("bcrypt");
const { Usuario, Posto, Produto, Avaliacoes } = require("../models");

module.exports = {
  dashboardUsuario: async (req, res) => {
    res.render("dashboard-usuario", { user: req.session.usuario.dataValues });
  },
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

      res.render("dashboard-usuario", { user });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("logado");
    //res.cookie("logado", { expires: Date.now() });
    res.redirect("/login");
  },
  verCadastro: (req, res) => {
    res.render("./usuario/cadastro", { user: req.session.usuario.dataValues });
  },
  editar: async (req, res) => {
    let { nome, sobrenome, email, senha } = req.body;
    let { id } = req.params;

    try {
      const usuario = await Usuario.findByPk(id);

      // console.log(usuario);
      // console.log(bcrypt.compareSync(senha, usuario.senha));

      // return res.send("OK");
      // if (!bcrypt.compareSync(senha, usuario.senha)) {
      //   return res.send("Senha inválida!");
      // }

      // return res.send("Alterado");

      nome = nome || usuario.nome;
      sobrenome = sobrenome || usuario.sobrenome;
      email = email || usuario.email;

      Usuario.update({
        nome,
        sobrenome,
        email,
      });

      res.render("dashboard-usuario", { user: req.session.usuario.dataValues });
    } catch (error) {
      res.status(404).send(error);
    }
  },
  verPostosFavoritos: async (req, res) => {
    let { id } = req.session.usuario;

    let user = await Usuario.findOne({
      where: { id },
      include: {
        association: "postos",
        through: {
          attributes: [
            "nome_fantasia",
            "cidade",
            "estado",
            "bairro",
            "endereco",
            "bandeira",
          ],
        },
        include: {
          association: "produtos",
          through: {
            attributes: ["nome", "preco"],
          },
        },
      },
    });

    res.render("./usuario/postos-favoritos", { user });
  },
  verAvaliacoes: async (req, res) => {
    let { id } = req.session.usuario;

    let user = await Usuario.findOne({
      where: { id },
      include: {
        association: "avaliacoes",
        through: {
          attributes: ["texto", "nota"],
        },
      },
    });
    // return res.send(user);

    res.render("./usuario/avaliacoes", { user });
  },
};
