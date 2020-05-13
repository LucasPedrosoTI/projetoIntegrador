"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Pagamentos",
      [
        {
          data_pagamento: new Date(),
          tipo_de_pagamento: "boleto",
          anuncios_id: 1,
        },
        {
          data_pagamento: new Date(),
          tipo_de_pagamento: "crédito",
          anuncios_id: 2,
        },
        {
          data_pagamento: new Date(),
          tipo_de_pagamento: "crédito",
          anuncios_id: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Pagamentos", null, {});
  },
};
