var express = require('express');
var router = express.Router();

const viewController = require('../controllers/viewController');
/* GET home page. */
router.get('/', viewController.index);

router.get('/main', viewController.main);

router.get('/login', viewController.login);

router.get('/cadastro', viewController.cadastro);

router.get('/postos', viewController.indexPostos);

router.get('/servicos', viewController.servicos);

router.get('/dashboard-empresa', viewController.dashboardEmpresa);

router.get('/servicoposto', viewController.servicoposto);

router.get('/postologado', viewController.postologado);

module.exports = router;
