const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const viewController = require("../controllers/viewController");
/* GET home page. */
router.get("/", viewController.index);

router.get("/main", viewController.main);

router.get("/login", viewController.login);

router.get("/cadastro", viewController.cadastro);

router.get("/postos", viewController.indexPostos);

router.get("/servicos", viewController.servicos);

router.get("/quemsomos", viewController.quemsomos);

router.get("/contato", viewController.contato);

router.get("/termosdeuso", viewController.termosdeuso);

module.exports = router;
