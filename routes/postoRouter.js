const express = require("express");
const router = express.Router();
const postoController = require("../controllers/postoController");

router.get("/index", postoController.index);

module.exports = router;
