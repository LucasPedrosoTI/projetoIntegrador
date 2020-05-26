"use strict";

const postos = require("../database/postosResposta.json");
const moment = require("moment");

for (const posto of postos) {
  let novaData = moment(posto.update_time, "DD/MM/YYYY").format("YYYY/MM/DD");
  posto.create_time = new Date();
  posto.update_time = new Date(novaData);
  // console.log(posto.create_time);
  console.log(posto.update_time);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Postos", postos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Postos", postos, {});
  },
};

// [
//   {
//     nome: "AUTO POSTO DF 180 LTDA",
//     cnpj: "07347238000137",
//     cep: "72322570",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "SAMABAIA",
//     endereco: "Q QN 433 CONJUNTO G LOTE",
//     bandeira: "IPIRANGA",
//     latitude: -15.77972,
//     longitude: -47.92972,
//     create_time: new Date(),
//     update_time: new Date("2020/03/02"),
//   },
//   {
//     nome: "CASCOL COMBUSTIVEIS PARA VEICULOS LTDA",
//     cnpj: "00306597001500",
//     cep: "70772500",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "SAMAMBAIA SUL",
//     endereco: "Q QR 516 CONJUNTO 13B LOTE LOTE",
//     bandeira: "BRANCA",
//     latitude: -15.77972,
//     longitude: -47.92972,
//     create_time: new Date(),
//     update_time: new Date("2020/03/02"),
//   },
//   {
//     nome: "AUTO POSTO ALMENARA LTDA",
//     cnpj: "05299796000149",
//     cep: "71710300",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "NUCLEO BANDEIRANTE",
//     endereco: "V NB 01 PLL",
//     bandeira: "RAIZEN",
//     latitude: -15.86917,
//     longitude: -47.97472,
//     create_time: new Date(),
//     update_time: new Date("2020/04/02"),
//   },
//   {
//     nome: "AUTO POSTO DO NUCLEO LTDA",
//     cnpj: "04285663000150",
//     cep: "71710300",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "NUCLEO BANDEIRANTE",
//     endereco: "V NB",
//     bandeira: "PETROBRAS DISTRIBUIDORA S.A.",
//     latitude: -15.86917,
//     longitude: -47.97472,
//     create_time: new Date(),
//     update_time: new Date("2020/04/02"),
//   },
//   {
//     nome: "AUTO POSTO SAO MARCOS LTDA",
//     cnpj: "72587132000172",
//     cep: "71735000",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "N BANDEIRANTE",
//     endereco: "SPMS ROD BSB ANAPOLIS LOTE",
//     bandeira: "RAIZEN",
//     latitude: -15.77972,
//     longitude: -47.92972,
//     create_time: new Date(),
//     update_time: new Date("2020/04/02"),
//   },
//   {
//     nome: "CALLTECH COMBUSTIVEIS E SERVICOS LTDA",
//     cnpj: "01357769000124",
//     cep: "71805700",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "RIACHO FUNDO I",
//     endereco: "A ESPECIAL 01 QN",
//     bandeira: "IPIRANGA",
//     latitude: -15.77972,
//     longitude: -47.92972,
//     create_time: new Date(),
//     update_time: new Date("2020/04/02"),
//   },
//   {
//     nome: "CASCOL COMBUSTIVEIS PARA VEICULOS LTDA",
//     cnpj: "00306597002655",
//     cep: "71727800",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "N BANDEIRANTE",
//     endereco: "ST SPMS EPIA LOTE 07",
//     bandeira: "IPIRANGA",
//     latitude: -15.77972,
//     longitude: -47.92972,
//     create_time: new Date(),
//     update_time: new Date("2020/04/02"),
//   },
//   {
//     nome: "CASCOL COMBUSTIVEIS PARA VEICULOS LTDA",
//     cnpj: "00306597005670",
//     cep: "71735000",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "N. BANDEIRANTE",
//     endereco: "ESTRADA NB EPNB PLL",
//     bandeira: "PETROBRAS DISTRIBUIDORA S.A.",
//     latitude: -15.77972,
//     longitude: -47.92972,
//     create_time: new Date(),
//     update_time: new Date("2020/04/02"),
//   },
//   {
//     nome: "CASCOL COMBUSTIVEIS PARA VEICULOS LTDA",
//     cnpj: "00306597008343",
//     cep: "71936250",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "AGUAS CLARAS",
//     endereco: "AV A/C AVENIDA DAS ARAUCARIAS LOTE",
//     bandeira: "IPIRANGA",
//     latitude: -27.11667,
//     longitude: -48.91667,
//     create_time: new Date(),
//     update_time: new Date("2020/04/02"),
//   },
//   {
//     nome: "CASCOL COMBUSTIVEIS PARA VEICULOS LTDA",
//     cnpj: "00306597009072",
//     cep: "72310510",
//     cidade: "BRASILIA",
//     estado: "DF",
//     bairro: "SAMAMBAIA",
//     endereco: "Q QS 320 CONJUNTO 10 LOTE",
//     bandeira: "BRANCA",
//     latitude: -15.88721,
//     longitude: -48.15084,
//     create_time: new Date(),
//     update_time: new Date("2020/04/02"),
//   },
// ]
