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

    static async vsi() {
        try {
            const stroskiRef = db.collection("Potni_stroski");
            const response = await stroskiRef.get();
            const stroski = [];
            response.forEach(doc => {
                stroski.push(doc.data());
            });

            return stroski;
        } catch (error) {
            throw new Error('Napaka pri pridobivanju stroskov iz baze: ' + error.message);
        }
    }

    static async getById(id) {
        try {
            const strosekRef = db.collection("Potni_stroski").doc(id);
            const response = await strosekRef.get();
            const strosek = response.data();

            return strosek;
        } catch (error) {
            throw new Error('Napaka pri pridobivanju stroska iz baze: ' + error.message);
        }
    }
}

module.exports = Expense;