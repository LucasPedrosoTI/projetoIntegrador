const moment = require("moment");
const { Posto, postos_produtos } = require("../models");
const opencage = require("opencage-api-client");

module.exports = {
  index: async (req, res) => {
    const postos = await Posto.findAll({
      include: ["produtos", "avaliacoes", "usuarios"],
    });

    for (const posto of postos) {
      posto.update_time = moment.utc(posto.update_time).format("DD/MM/YYYY");
      console.log(posto.update_time);
    }

    // let data = moment(postos[0].update_time).format("DD/MM/YY");
    res.send(postos);
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

    // ENCODAR QUERY PARA TIPO URL
    let uri = encodeURI(`${endereco}, ${bairro}, ${cidade}, ${estado}`);

    // CONSULTAR API DE GEOCODING
    const { results } = await opencage.geocode({
      q: uri,
    });

    await Posto.findOrCreate({
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

    let posto = await Posto.findOne({ where: { cnpj } });

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
};
