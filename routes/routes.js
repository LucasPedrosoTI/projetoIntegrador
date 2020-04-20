var express = require("express");
var router = express.Router();

const viewController = require("../controllers/viewController");
/* GET home page. */
router.get("/", viewController.index);

router.get("/main", viewController.main);

router.get("/login", viewController.login);

router.get("/cadastrocpf", viewController.cadastroCpf);

router.get("/cadastrocnpj", viewController.cadastroCnpj);

router.get("/postos", viewController.indexPostos);

module.exports = router;
