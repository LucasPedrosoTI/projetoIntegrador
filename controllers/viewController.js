const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');
const axios = require('axios');
const opencage = require('opencage-api-client');
const postosResposta = require('../database/postosResposta.json');
const produtosResposta = require('../database/produtosResposta.json');
const moment = require('moment');
const { Posto, Usuario, Produto } = require('../models');
const sequelize = require('sequelize');

const now = moment();

// const interval = require("interval-promise");
// const util = require("util");

const source = path.join('database', 'postos.csv');
const destination = path.join('database', 'postosResposta.json');
const destinationProdutos = path.join('database', 'produtosResposta.json');

let consultaCNPJ = false;

module.exports = {
  index: (req, res, next) => res.render('index'),

  main: async (req, res, next) => {
    let postos = [];

    if (req.session.usuario) {
      let { id } = req.session.usuario;
      const user = await Usuario.findOne({ where: id });
      // return res.send(user);
      postos = await Posto.findAll({
        include: [
          {
            association: 'produtos',
            where: { id: user.produtos_id },
          },
          'avaliacoes',
          'usuarios',
        ],
      });
    } else {
      postos = await Posto.findAll({
        include: [
          {
            association: 'produtos',
            where: { id: 1 },
          },
          'avaliacoes',
          'usuarios',
        ],
      });
    }

    // CÓDIGO PARA CALCULAR E ARMAZENAR A NOTA MÉDIA DOS POSTOS
    for (const posto of postos) {
      if (posto.avaliacoes.length == 0) {
        posto.media = 0;
      } else {
        // EXTRAIR TODAS AS NOTAS DE UM POSTO E ARMAZENAR EM UM ARRAY
        let notas = [];
        for (const avaliacao of posto.avaliacoes) {
          notas.push(Number(avaliacao.Avaliacoes.nota));
        }
        // COM O ARRAY DE NOTAS, BASTA SOMAR TODOS OS INDICES E DIVIDIR PELA QTD PARA OBTER A MEDIA
        let media = notas.reduce((a, b) => a + b) / notas.length;

        // COD P/ TER CTZ QUE A NOTA SERÁ SEMPRE DE 0.5 EM 0.5
        media = Math.round(media * 2) / 2;
        // CRIAR A PROPRIEDADE MEDIA
        posto.media = media;
      }
    }

    res.render('main', { postos });
  },

  indexPostos: async (req, res) => {
    // TRANSFORMAR CSV EM JSON
    const postos = await csv({
      noheader: false,
      headers: ['nome', 'cnpj', 'produto', 'data', 'preco', 'bandeira'],
      delimiter: ',',
    }).fromFile(source);

    console.log('Parse CSV OK!');

    const precisaReq = (posto) => {
      return postosResposta.find((p) => p.cnpj == posto.cnpj) == undefined;
    };

    const naoPrecisaReq = (posto) => {
      return postosResposta.find((p) => p.cnpj == posto.cnpj) != undefined;
    };

    const postosQuePrecisamDeReq = postos.filter(precisaReq);
    const postosQueNaoPrecisamDeReq = postos.filter(naoPrecisaReq);

    let i = 0;
    let idInterval = setInterval(() => {
      if (i < 30) {
        criarPosto(postosQuePrecisamDeReq[i]);
        i++;
      } else {
        clearInterval(idInterval);
      }
    }, 20000);

    postosQueNaoPrecisamDeReq.forEach((p) => criarPosto(p));

    function criarPosto(postoCheck) {
      let produto = {};
      let produtos_id;

      //VERIFICA SE O POSTO JÁ EXISTE
      let postoJaExiste = postosResposta.find(
        (posto) => posto.cnpj == postoCheck.cnpj
      );

      // DEFINE A VAR produtos_id DE ACORDO COM O PRODUTO DO CSV ETANOL(2) OU GASOLINA(1)
      postoCheck.produto == 'ETANOL' ? (produtos_id = 2) : (produtos_id = 1);

      // SETA O ID DO PRODUTO NO OBJETO PRODUTO
      produto.produtos_id = produtos_id;

      // SE O POSTO JÁ EXISTE, VERIFICAR SE O PRODUTO TBM JÁ EXISTE PRA ESSE POSTO
      if (postoJaExiste) {
        console.log('Posto já existe, verificando se o produto existe');
        var produtoJaExiste = produtosResposta.find(
          (produto) =>
            produto.produtos_id == produtos_id &&
            produto.postos_id == postoJaExiste.id
        );
      }

      if (
        // SE O PRODUTO JA EXISTE E O POSTO TBM, VERIFICA SE A DATA DO POSTO CHECK É MAIS ATUAL OU MAIS ANTIGA
        produtoJaExiste &&
        postoJaExiste &&
        moment(postoCheck.data, 'DD/MM/YYYY').subtract(
          moment(postoJaExiste.update_time, 'DD/MM/YYYY')
        ) > 0
      ) {
        // COMO PRODUTO JÁ EXISTE, MAS ELE É MAIS ANTIGO ATUALIZA O PREÇO, A DATA DE ATUALIZAÇÃO DO POSTO E FINALIZA A FUNÇÃO
        console.log(
          'posto e produto já existem, mas o produto analisado é mais atual. Atualizando!'
        );
        produtoJaExiste.preco = Number(postoCheck.preco.replace(',', '.'));

        // SETA O ID DO POSTO PARA O ID DO POSTO EXISTENTE
        produto.postos_id = postoJaExiste.id;

        postoJaExiste.update_time = moment(
          postoCheck.data,
          'DD/MM/YYYY'
        ).format('DD/MM/YYYY');

        fs.writeFileSync(destination, JSON.stringify(postosResposta));
        fs.writeFileSync(destinationProdutos, JSON.stringify(produtosResposta));

        console.log('Produto e posto atualizados com sucesso!');
        // res.send(produtosResposta);
        return;
      } else if (!postoJaExiste && !produtoJaExiste) {
        console.log('Criando Posto e produto...');

        // CASO O PRODUTO NÃO EXISTA, SETA O PREÇO
        produto.preco = Number(postoCheck.preco.replace(',', '.'));
        // CONSULTAR A API DE CNPJ

        // const { data } = await
        axios
          .get(`https://www.receitaws.com.br/v1/cnpj/${postoCheck.cnpj}`)
          .then((response) => {
            const { data } = response;

            opencage
              .geocode({
                q: `${data.logradouro}, ${data.bairro}, ${data.municipio}, ${data.uf}`,
              })
              .then((response2) => {
                const { results } = response2;
                const id =
                  postosResposta.length == 0
                    ? 1
                    : postosResposta[postosResposta.length - 1].id + 1;

                const novoPosto = {
                  id,
                  nome: data.nome,
                  cnpj: postoCheck.cnpj,
                  cep: data.cep.replace(/[-.]/gm, ''),
                  cidade: data.municipio,
                  estado: data.uf,
                  bairro: data.bairro,
                  endereco: data.logradouro,
                  bandeira: postoCheck.bandeira,
                  latitude: results[0].geometry.lat,
                  longitude: results[0].geometry.lng,
                  create_time: now.format('DD/MM/YYYY'),
                  update_time: moment(postoCheck.data, 'DD/MM/YYYY').format(
                    'DD/MM/YYYY'
                  ),
                };

                postosResposta.push(novoPosto);

                produto.postos_id = novoPosto.id;
                produtosResposta.push(produto);

                consultaCNPJ = true;

                fs.writeFileSync(destination, JSON.stringify(postosResposta));
                fs.writeFileSync(
                  destinationProdutos,
                  JSON.stringify(produtosResposta)
                );

                console.log('produto e posto criado com sucesso');
                return;
              });
          });

        // CONSULTAR API DE GEOCODING
        // const { results } = await

        // CRIAR UM OBJETO COM AS INFORMAÇÕES NECESSÁRIAS
      } else if (!produtoJaExiste && postoJaExiste) {
        // SETA O ID DO POSTO PARA O ID DO POSTO EXISTENTE
        produto.postos_id = postoJaExiste.id;
        produtoJaExiste.preco = Number(postoCheck.preco.replace(',', '.'));

        produtosResposta.push(produto);

        postoJaExiste.update_time = moment(
          postoCheck.data,
          'DD/MM/YYYY'
        ).format('DD/MM/YYYY');

        // SALVAR O OBJETO NUM JSON

        fs.writeFileSync(destination, JSON.stringify(postosResposta));

        fs.writeFileSync(destinationProdutos, JSON.stringify(produtosResposta));

        console.log('Produto criado com sucesso!');
        // res.send(produtosResposta);
        return;
      } else {
        console.log(
          'Ambos já existem e o produto a adicionar é mais antigo que o existente'
        );
        // res.send(postosResposta);
        return;
      }
    }
  },
  login: (req, res, next) => {
    if (req.session.usuario) {
      res.redirect('/usuario/dashboard');
    }

    res.render('login', { error: null });
  },

  cadastro: (req, res, next) => {
    if (req.session.usuario) {
      res.redirect('/usuario/dashboard');
    }
    res.render('cadastro');
  },

  servicos: (req, res) => {
    res.render('servicos');
  },

  quemsomos: (req, res) => {
    res.render('quemsomos');
  },

  contato: (req, res) => {
    res.render('contato');
  },

  termosdeuso: (req, res) => {
    res.render('termosdeuso');
  },

  dashboardEmpresa: (req, res) => {
    res.render('dashboard-empresa');
  },
};
