const {
  Usuario,
  Posto,
  Produto,
  Avaliacoes,
  postos_favoritos,
} = require("../models");

module.exports = {
  index: async (req, res) => {
    const postos = await Posto.findAll({
      include: ["produtos", "avaliacoes", "usuarios"],
    });

    res.json(postos);
  },
};
