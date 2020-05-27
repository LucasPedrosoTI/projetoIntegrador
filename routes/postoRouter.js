const express = require("express");
const router = express.Router();
const postoController = require("../controllers/postoController");

router.get("/index", postoController.index);

router.get("/preco/atualizar", postoController.atualizarPreco);

router.post("/adicionar", postoController.novoPosto);

module.exports = router;
