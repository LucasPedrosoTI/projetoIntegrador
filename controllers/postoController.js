const { Posto, postos_produtos } = require("../models");
const opencage = require("opencage-api-client");

module.exports = {
  index: async (req, res) => {
    const postos = await Posto.findAll({
      include: ["produtos", "avaliacoes", "usuarios"],
    });

    res.json(postos);
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
    // let uri = encodeURI(
    //   `${endereco}, ${bairro}, ${cidade}, ${estado}, Brazil, ${cep}`
    // );

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
};
