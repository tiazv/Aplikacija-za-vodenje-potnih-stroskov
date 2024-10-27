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

    static async vsi() {
        try {
            const uporabnikiRef = db.collection("Uporabniki");
            const response = await uporabnikiRef.get();
            const uporabniki = [];
            response.forEach(doc => {
                uporabniki.push(doc.data());
            });

            return uporabniki;
        } catch (error) {
            throw new Error('Napaka pri pridobivanju uporabnikov iz baze: ' + error.message);
        }
    }

    static async getById(id) {
        try {
            const uporabnikRef = db.collection("Uporabniki").doc(id);
            const response = await uporabnikRef.get();
            const uporabnik = response.data();

            return uporabnik;
        } catch (error) {
            throw new Error('Napaka pri pridobivanju uporabnika iz baze: ' + error.message);
        }
    }
}

module.exports = User;