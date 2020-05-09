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

router.get('/quemsomos', viewController.quemsomos);

router.get('/contato', viewController.contato);

router.get('/termosdeuso', viewController.termosdeuso);

router.get('/dashboard-empresa', viewController.dashboardEmpresa);

router.get('/dashboard-usuario', viewController.dashboardUsuario);

module.exports = router;
