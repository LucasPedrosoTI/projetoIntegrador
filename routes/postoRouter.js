const express = require("express");
const router = express.Router();
const postoController = require("../controllers/postoController");
const auth = require("../middlewares/auth");

router.get("/consulta", postoController.consulta);

router.get("/dashboard", auth.posto, postoController.dashboardEmpresa);

router.get("/index", postoController.index);

router.get("/preco/atualizar", postoController.atualizarPreco);

router.post("/adicionar", postoController.novoPosto);

router.post("/logar", postoController.logar);

router.get("/logout", postoController.logout);

module.exports = router;
