var express = require("express");
var router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", usuarioController.cadastrar);

router.post("/logar", usuarioController.logar);

router.get("/logout", usuarioController.logout);

module.exports = router;
