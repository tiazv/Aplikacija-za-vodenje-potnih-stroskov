const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/dodaj', userController.dodajUporabnika);

module.exports = router;