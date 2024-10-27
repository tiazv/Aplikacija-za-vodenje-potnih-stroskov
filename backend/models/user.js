const db = require('../db');
const bcrypt = require('bcrypt');

class User {
    static async dodaj(ime, priimek, email, geslo, tip) {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(geslo, saltRounds);

            const id = email;
            const novUporabnik = {
                ime: ime,
                priimek: priimek,
                email: email,
                geslo: hashedPassword,
                tip: tip
            };
            
            db.collection("Uporabniki").doc(id).set(novUporabnik);
            return { message: 'Uspešna registracija', uporabnik: novUporabnik };
        } catch (error) {
            throw new Error('Napaka pri dodajanju uporabnika v bazo: ' + error.message);
        }
    }
}

module.exports = User;