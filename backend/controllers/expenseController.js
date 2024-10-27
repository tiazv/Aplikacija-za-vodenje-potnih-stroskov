const Expense = require('../models/expense');

async function dodajStrosek(req, res) {
    const { datum_odhoda, datum_prihoda, kilometrina, lokacija, opis, oseba } = req.body;
  
    if (!datum_odhoda || !datum_prihoda || !kilometrina || !lokacija || !opis || !oseba) {
      return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }
  
    try {  
      const novStrosek = await Expense.add(datum_odhoda, datum_prihoda, kilometrina, lokacija, opis, oseba);
      
      res.status(200).json({ strosek: novStrosek });
    } catch (error) {
      res.status(500).json({ details: error.message });
    }
}

module.exports = {
    dodajStrosek
}