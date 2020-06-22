const { Posto, postos_produtos, Usuario_Posto } = require("../models");
const opencage = require("opencage-api-client");
const { calcularDistancia } = require("../lib/utils.js");
const bcrypt = require("bcrypt");
const axios = require("axios");

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

    const postosFiltrados = postos.filter((posto) => posto.distancia <= 10);

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
      //   include: "anuncios",
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

    res.redirect("/posto/dashboard");
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("postoLogado");
    res.redirect("/login");
  },
  consulta: async (req, res) => {
    const { cnpj, search } = req.query;
    const validaCep = /^[0-9]{8}$/;

    if (search) {
      const enderecoNormalizado = search
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") //remove acentos
        .replace(/[\/-]/gm, ""); //remove barra e traço

      if (validaCep.test(enderecoNormalizado)) {
        try {
          const { data } = await axios.get(
            `http://viacep.com.br/ws/${enderecoNormalizado}/json/`
          );

          const { logradouro, bairro, localidade, uf } = data;

          const { results } = await opencage.geocode({
            q: `${logradouro}, ${bairro}, ${localidade}, ${uf}, Brazil`,
            language: "pt",
          });

          return res.json(results);
        } catch (error) {
          console.log(error);
        }
      }

      const { results } = await opencage.geocode({
        q: `${enderecoNormalizado}, Brazil`,
        language: "pt",
      });

      return res.json(results);
    }

    if (cnpj) {
      const { data } = await axios.get(
        `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
      );

      return res.json(data);
    }

    return res.json({ msg: "Nenhum parâmetro passado" });
  },
};
