const bcrypt = require("bcrypt");
const { Usuario, Avaliacoes, postos_favoritos } = require("../models");
const { capitalizeName } = require("../lib/utils");

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
    let { nome, sobrenome, email, produtos_id, senha } = req.body;

    let hash = bcrypt.hashSync(senha, 10);

    const user = await Usuario.findOne({ where: { email } });

    console.log(user);

    if (user) {
      return res.render("cadastro", { error: "Email já cadastrado" });
    }

    try {
      // create a new user with the password hash from bcrypt
      const user = await Usuario.create({
        nome: capitalizeName(nome.trim()),
        sobrenome: capitalizeName(sobrenome.trim()),
        email,
        produtos_id: Number(produtos_id),
        senha: hash,
      });

      user.senha = undefined;

      req.session.usuario = user;

      return res.redirect("/usuario/dashboard");
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

      user.senha = undefined;

      req.session.usuario = user;

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

    let user = await Usuario.findOne({
      where: { id },
      include: ["produtos"],
    });

    // return res.send(user);

    res.render("./usuario/cadastro", { user, active });
  },
  editar: async (req, res) => {
    let { nome, sobrenome, email, produtos_id, senha } = req.body;
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
        produtos_id: Number(produtos_id),
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
    const { senha, novaSenha } = req.body;
    const { id } = req.session.usuario;
    const hash = bcrypt.hashSync(novaSenha, 10);
    try {
      const user = await Usuario.findByPk(id);
      if (!bcrypt.compareSync(senha, user.senha)) {
        return res.render("dashboard-usuario", { msg: "Senha inválida" });
      }
      await user.update({
        senha: hash,
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
  favoritarPosto: async (req, res) => {
    let postos_id = req.params.id;
    let usuarios_id = req.session.usuario.id;

    let posto = await postos_favoritos.findOne({
      where: { postos_id, usuarios_id },
    });

    if (!posto)
      try {
        await postos_favoritos.create({ postos_id, usuarios_id });

        res.redirect("/main");
        return;
      } catch (error) {
        res.send(error);
      }
    try {
      await posto.destroy();

      res.redirect("/main");
    } catch (error) {
      res.send(error);
    }
  },
  deletarFavorito: async (req, res) => {
    let postos_id = req.body.id;
    let usuarios_id = req.session.usuario.id;

    // let user = await Usuario.findByPk()
    let posto = await postos_favoritos.findOne({
      where: { postos_id, usuarios_id },
    });

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
      include: ["avaliacoes"],
    });
    // return res.send(user);

    res.render("./usuario/avaliacoes", { active, user });
  },
  criarAvaliacao: async (req, res) => {
    let { id, texto, nota } = req.query;
    let usuarios_id = req.session.usuario.id;

    texto = texto.trim();

    let avaliacao = await Avaliacoes.findOne({
      where: { postos_id: id, usuarios_id },
    });

    if (avaliacao) {
      await avaliacao.update({
        nota: Number(nota),
        texto,
        updatedAt: new Date(),
      });

      res.redirect("/main");
      return;
    } else {
      try {
        await Avaliacoes.create({
          usuarios_id,
          postos_id: id,
          nota: Number(nota),
          texto,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        res.redirect("/main");
      } catch (error) {
        res.send(error);
      }
    }
  },
  editarAvaliacao: async (req, res) => {
    let { id, texto, nota } = req.body;
    let usuarios_id = req.session.usuario.id;

    let avaliacao = await Avaliacoes.findOne({
      where: { postos_id: id, usuarios_id },
    });

    texto = texto.trim() || avaliacao.texto;

    try {
      await avaliacao.update({
        nota: Number(nota),
        texto,
        updatedAt: new Date(),
      });

      res.redirect("/usuario/dashboard/avaliacoes");
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  },
  deletarAvaliacao: async (req, res) => {
    let { id } = req.body;
    let usuarios_id = req.session.usuario.id;

    let avaliacao = await Avaliacoes.findOne({
      where: { postos_id: id, usuarios_id },
    });

    // return res.send(avaliacao);
    try {
      await avaliacao.destroy();

      res.redirect("/usuario/dashboard/avaliacoes");
    } catch (error) {
      res.send(error);
    }
  },
};
