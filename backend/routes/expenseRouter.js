const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/dodaj', expenseController.dodajStrosek);
router.get('/vsi', expenseController.vsiStroski);
router.get('/:id', expenseController.najdiStrosek);
router.delete('/:id', expenseController.izbrisiStrosek);

module.exports = router;