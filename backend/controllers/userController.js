const bcrypt = require('bcrypt');
const User = require('../models/user');

async function dodajUporabnika(req, res) {
    const { ime, priimek, email, geslo, tip } = req.body;
  
    if (!ime || !priimek || !email || !geslo || !tip) {
      return res.status(400).json({ error: 'Vsa polja morajo biti izpolnjena' });
    }
  
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(geslo, saltRounds);
  
      const novUporabnik = await User.add(ime, priimek, email, hashedPassword, tip);
      
      res.status(200).json({ uporabnik: novUporabnik });
    } catch (error) {
      res.status(500).json({ details: error.message });
    }
}

module.exports = {
    dodajUporabnika
}