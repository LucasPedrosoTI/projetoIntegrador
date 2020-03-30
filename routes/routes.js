var express = require('express');
var router = express.Router();

const viewController = require('../controllers/viewController');
/* GET home page. */
router.get('/', viewController.index);

router.get('/main', viewController.main);

router.get('/login', viewController.login);

router.get('/cadastroCpf', viewController.cadastroCpf);

router.get('/cadastroCnpj', viewController.cadastroCnpj);

module.exports = router;