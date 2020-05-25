const moment = require("moment");
const { Posto, postos_produtos } = require("../models");

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
};
