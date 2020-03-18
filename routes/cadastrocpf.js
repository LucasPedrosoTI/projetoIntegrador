var express = require('express');
var router = express.Router();

/* GET Cadastro CPF. */
router.get('/', function(req, res, next) {
  res.render('cadastrocpf');
});

module.exports = router;
