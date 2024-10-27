const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/dodaj', userController.dodajUporabnika);
router.get('/vsi', userController.vsiUporabniki);
router.get('/:id', userController.najdiUporabnika);

module.exports = router;