var express = require("express");
var router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", usuarioController.cadastrar);

router.post("/logar", usuarioController.logar);

module.exports = router;
