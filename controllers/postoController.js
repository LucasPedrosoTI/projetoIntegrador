const { Posto, postos_produtos } = require("../models");

module.exports = {
  index: async (req, res) => {
    const postos = await Posto.findAll({
      include: ["produtos", "avaliacoes", "usuarios"],
    });

    res.json(postos);
  },

  atualizarPreco: async (req, res) => {
    let { produtos_id, postos_id, preco } = req.query;

    const posto = await postos_produtos.findOne({
      where: {
        postos_id,
        produtos_id,
      },
    });

    posto.update({
      preco: Number(preco),
    });

    res.redirect("/main");
  },
};
