var express = require("express");
var router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

router.get("/dashboard", auth, usuarioController.dashboardUsuario);

router.get("/dashboard/favoritos", auth, usuarioController.verPostosFavoritos);

router.delete(
  "/dashboard/favoritos/deletar",
  usuarioController.deletarFavorito
);

router.get("/dashboard/cadastro", auth, usuarioController.verCadastro);

router.put("/dashboard/cadastro", usuarioController.editar);

router.put("/dashboard/cadastro/alterarsenha", usuarioController.alterarSenha);

router.delete("/dashboard/cadastro/deletar", usuarioController.destroy);

router.get("/dashboard/avaliacoes", auth, usuarioController.verAvaliacoes);

router.post("/cadastrar", usuarioController.cadastrar);

router.post("/logar", usuarioController.logar);

router.get("/logout", usuarioController.logout);

module.exports = router;
