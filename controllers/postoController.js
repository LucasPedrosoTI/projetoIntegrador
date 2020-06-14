const { Posto, postos_produtos, Usuario_Posto } = require("../models");
const opencage = require("opencage-api-client");
const { calcularDistancia } = require("../lib/utils.js");
const bcrypt = require("bcrypt");

module.exports = {
  dashboardEmpresa: (req, res) => {
    res.render("dashboard-empresa");
  },
  index: async (req, res) => {
    const { latP, longP } = req.query;

    const postos = await Posto.findAll({
      include: ["produtos", "avaliacoes", "usuarios"],
    });

    if (!latP || !longP) {
      return res.json(postos);
    }

    for (const posto of postos) {
      posto.distancia = calcularDistancia(
        Number(posto.latitude),
        Number(posto.longitude),
        Number(latP),
        Number(longP)
      );
    }

    const postosFiltrados = postos.filter((posto) => posto.distancia < 10);

    res.json(postosFiltrados);
  },

  atualizarPreco: async (req, res) => {
    let { produtos_id, postos_id, preco } = req.query;

    const precoData = await Posto.findOne({
      where: { id: postos_id },
    });

    // return res.send(precoData);
    const posto = await postos_produtos.findOne({
      where: {
        postos_id,
        produtos_id,
      },
    });

    await precoData.update({
      update_time: new Date(),
    });

    await posto.update({
      preco: Number(preco),
    });

    res.redirect("/main");
  },
  novoPosto: async (req, res) => {
    let {
      nome,
      cnpj,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      bandeira,
      precoEtanol,
      precoGasolina,
    } = req.body;

    endereco = endereco.toUpperCase().trim() + ", " + numero.trim();

    // CONSULTAR API DE GEOCODING
    const { results } = await opencage.geocode({
      q: `${endereco}, ${bairro}, ${cidade}, ${estado}, Brazil`,
      language: "pt",
    });

    const [posto] = await Posto.findOrCreate({
      where: { cnpj },
      defaults: {
        nome: nome.toUpperCase().trim(),
        cnpj,
        cep: cep.replace(/[-.]/gm, "").trim(),
        endereco,
        bairro: bairro.toUpperCase().trim(),
        cidade: cidade.toUpperCase().trim(),
        estado: estado.toUpperCase().trim(),
        bandeira: bandeira.toUpperCase().trim(),
        latitude: results[0].geometry.lat,
        longitude: results[0].geometry.lng,
        create_time: new Date(),
        update_time: new Date(),
      },
    });

    await postos_produtos.bulkCreate([
      {
        postos_id: posto.id,
        produtos_id: 1,
        preco: precoGasolina,
      },
      {
        postos_id: posto.id,
        produtos_id: 2,
        preco: precoEtanol,
      },
    ]);

    res.redirect("/main");
  },
  logar: async (req, res) => {
    // pegar info do body
    let { email, senha, logado } = req.body;

    // tentar carregar user
    let user = await Usuario_Posto.findOne({
      where: {
        email,
      },
      // include: {
      //   association: "posto",
      //   include: "servicos",
      // },
    });

    //verificar se existe o user
    if (!user) {
      return res.render("login", { error: "Usuário/Senha inválido" });
    }

    // validar senha passada
    if (!bcrypt.compareSync(senha, user.senha)) {
      // return res.send("sucesso");
      return res.render("login", { error: "Usuário/Senha inválido" }); //senha ou email invalidos
    }
    //setar session

    user.senha = undefined;

    req.session.posto = user;

    if (logado != undefined) {
      res.cookie("postoLogado", user.email, { maxAge: 3600000 });
    }

    // return res.json(user);
    res.redirect("/posto/dashboard");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("postoLogado");
    res.redirect("/login");
  },
};
