var express = require('express');
var router = express.Router();

/* GET Cadastro CNPJ. */
router.get('/', function(req, res, next) {
    res.render('cadastrocnpj');
});

module.exports = router;