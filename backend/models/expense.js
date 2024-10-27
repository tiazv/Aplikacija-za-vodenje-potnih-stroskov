const db = require('../db');

class Expense {
    static async dodaj(datum_odhoda, datum_prihoda, kilometrina, lokacija, opis, oseba) {
        try {
            const id = oseba + '_' + datum_odhoda.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            const novStrosek = {
                datum_odhoda: datum_odhoda,
                datum_prihoda: datum_prihoda,
                kilometrina: kilometrina,
                lokacija: lokacija,
                opis: opis,
                oseba: oseba
            };
            
            db.collection("Potni_stroski").doc(id).set(novStrosek);
            return { message: 'Uspešno dodan potni strošek', strosek: novStrosek };
        } catch (error) {
            throw new Error('Napaka pri dodajanju potnega stroška v bazo: ' + error.message);
        }
    }
}

module.exports = Expense;