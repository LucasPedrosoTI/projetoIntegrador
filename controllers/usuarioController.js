const bcrypt = require("bcrypt");
const { Usuario, Posto, Produto, Avaliacoes } = require("../models");
const { capitalizeName } = require("../lib/capitalizeName");

module.exports = {
  dashboardUsuario: async (req, res) => {
    res.render("dashboard-usuario", { msg: null });
  },
  cadastrar: async (req, res) => {
    let { nome, sobrenome, email, senha } = req.body;

    let hash = bcrypt.hashSync(senha, 10);

    try {
      // create a new user with the password hash from bcrypt
      await Usuario.create({
        nome: capitalizeName(nome.trim()),
        sobrenome: capitalizeName(sobrenome.trim()),
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

      // res.locals.user = user;

      if (logado != undefined) {
        res.cookie("logado", user.email, { maxAge: 3600000 });
      }

      res.redirect("/usuario/dashboard");
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
  verCadastro: async (req, res) => {
    let { id } = req.session.usuario;

    let user = await Usuario.findByPk(id);

    // return res.send(user);

    res.render("./usuario/cadastro", { user });
  },
  editar: async (req, res) => {
    let { nome, sobrenome, email, senha } = req.body;
    let { id } = req.session.usuario;

    try {
      const user = await Usuario.findByPk(id);

      if (!bcrypt.compareSync(senha, user.senha)) {
        return res.render("dashboard-usuario", { msg: "Senha inválida" });
      }

      nome = capitalizeName(nome.trim()) || user.nome;
      sobrenome = capitalizeName(sobrenome.trim()) || user.sobrenome;
      email = email || user.email;

      await user.update({
        nome,
        sobrenome,
        email,
      });

      res.cookie("logado", user.email, { maxAge: 3600000 });

      res.render("dashboard-usuario", { msg: "Atualizado com sucesso!!" });
    } catch (error) {
      res.status(404).send(error);
    }
  },
  alterarSenha: async (req, res) => {
    const { senha, novaSenha, confirmarSenha } = req.body;
    const { id } = req.session.usuario;
    let novaSenha2 = bcrypt.hashSync(novaSenha, 10);
    try {
      const user = await Usuario.findByPk(id);
      if (!bcrypt.compareSync(senha, user.senha)) {
        return res.render("dashboard-usuario", { msg: "Senha inválida" });
      }
      await user.update({
        senha: novaSenha2,
      });
      res.cookie("logado", user.email, { maxAge: 3600000 });
      res.render("dashboard-usuario", { msg: "Atualizado com sucesso!!" });
    } catch (error) {
      res.status(404).send(error);
      console.log(error);
    }
  },
  destroy: async (req, res) => {
    const { id } = req.session.usuario;

    const user = await Usuario.destroy({
      where: { id },
    });
    console.log("executou");
    res.redirect("/");
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
