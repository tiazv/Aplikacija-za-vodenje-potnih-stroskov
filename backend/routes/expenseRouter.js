const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/dodaj', expenseController.dodajStrosek);

module.exports = router;