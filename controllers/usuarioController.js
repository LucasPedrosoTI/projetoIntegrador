const bcrypt = require("bcrypt");
const {
  Usuario,
  Posto,
  Produto,
  Avaliacoes,
  postos_favoritos,
} = require("../models");
const { capitalizeName } = require("../lib/capitalizeName");

let active = {
  cadastro: "",
  favoritos: "",
  avaliacoes: "",
};

module.exports = {
  dashboardUsuario: async (req, res) => {
    active.avaliacoes = "";
    active.favoritos = "";
    active.cadastro = "";

    res.render("dashboard-usuario", { msg: null, active });
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
    res.redirect("/login");
  },
  verCadastro: async (req, res) => {
    let { id } = req.session.usuario;

    active.cadastro = "active";
    active.avaliacoes = "";
    active.favoritos = "";

    let user = await Usuario.findByPk(id);

    // return res.send(user);

    res.render("./usuario/cadastro", { user, active });
  },
  editar: async (req, res) => {
    let { nome, sobrenome, email, senha } = req.body;
    let { id } = req.session.usuario;

    try {
      const user = await Usuario.findByPk(id);

      if (!bcrypt.compareSync(senha, user.senha)) {
        return res.render("dashboard-usuario", {
          active,
          msg: "Senha inválida",
        });
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

      res.render("dashboard-usuario", {
        active,
        msg: "Atualizado com sucesso!!",
      });
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
      res.render("dashboard-usuario", {
        active,
        msg: "Atualizado com sucesso!!",
      });
    } catch (error) {
      res.status(404).send(error);
      console.log(error);
    }
  },
  destroy: async (req, res) => {
    let { id } = req.session.usuario;
    let { senha } = req.body;

    try {
      const user = await Usuario.findByPk(id);

      if (!bcrypt.compareSync(senha, user.senha)) {
        return res.render("dashboard-usuario", {
          active,
          msg: "Senha inválida",
        });
      }

      await Usuario.destroy({
        where: { id },
      });

      req.session.destroy();
      res.clearCookie("logado");

      res.redirect("/");
    } catch (error) {
      res.status(404).send(error);
    }
  },
  verPostosFavoritos: async (req, res) => {
    let { id } = req.session.usuario;

    active.favoritos = "active";
    active.avaliacoes = "";
    active.cadastro = "";

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

    res.render("./usuario/postos-favoritos", { active, user });
  },
  deletarFavorito: async (req, res) => {
    let { id } = req.body;

    let posto = await postos_favoritos.findOne({ where: { postos_id: id } });

    try {
      await posto.destroy();

      res.redirect("/usuario/dashboard/favoritos");
    } catch (error) {
      res.send(error);
    }
  },
  verAvaliacoes: async (req, res) => {
    let { id } = req.session.usuario;

    active.avaliacoes = "active";
    active.favoritos = "";
    active.cadastro = "";

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

    res.render("./usuario/avaliacoes", { active, user });
  },
  editarAvaliacao: async (req, res) => {
    let { id, texto } = req.body;

    let avaliacao = await Avaliacoes.findOne({ where: { id } });

    texto = texto.trim() || avaliacao.texto;

    try {
      await avaliacao.update({
        texto,
      });

      res.redirect("/usuario/dashboard/avaliacoes");
    } catch (error) {
      res.send(error);
    }
  },
  deletarAvaliacao: async (req, res) => {
    let { id } = req.body;

    let avaliacao = await Avaliacoes.findOne({ where: { id } });

    try {
      await avaliacao.destroy();

      res.redirect("/usuario/dashboard/avaliacoes");
    } catch (error) {
      res.send(error);
    }
  },
};
