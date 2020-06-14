const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

router.get("/dashboard", auth.user, usuarioController.dashboardUsuario);

router.get(
  "/dashboard/favoritos",
  auth.user,
  usuarioController.verPostosFavoritos
);

router.get(
  "/dashboard/favoritos/add/:id",
  auth.user,
  usuarioController.favoritarPosto
);

router.delete(
  "/dashboard/favoritos/deletar",
  usuarioController.deletarFavorito
);

router.get("/dashboard/cadastro", auth.user, usuarioController.verCadastro);

router.put("/dashboard/cadastro", usuarioController.editar);

router.put("/dashboard/cadastro/alterarsenha", usuarioController.alterarSenha);

router.delete("/dashboard/cadastro/deletar", usuarioController.destroy);

router.get("/dashboard/avaliacoes", auth.user, usuarioController.verAvaliacoes);

router.get("/avaliacoes/add", auth.user, usuarioController.criarAvaliacao);

router.put("/dashboard/avaliacoes/editar", usuarioController.editarAvaliacao);

router.delete(
  "/dashboard/avaliacoes/deletar",
  usuarioController.deletarAvaliacao
);

router.post("/cadastrar", usuarioController.cadastrar);

router.post("/logar", usuarioController.logar);

router.get("/logout", usuarioController.logout);

module.exports = router;
