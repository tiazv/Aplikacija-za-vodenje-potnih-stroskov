const db = require("../db");

class Expense {
  static async add(
    datum_odhoda,
    datum_prihoda,
    kilometrina,
    lokacija,
    opis,
    oseba
  ) {
    try {
      const id =
        oseba +
        "_" +
        datum_odhoda
          .replace(/\s+/g, "")
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase() +
        "_" +
        datum_prihoda
          .replace(/\s+/g, "")
          .replace(/[^a-zA-Z0-9]/g, "")
          .toLowerCase();
      const novStrosek = {
        id: id,
        datum_odhoda: datum_odhoda, // "2024-10-27"
        datum_prihoda: datum_prihoda, // "2024-10-27"
        kilometrina: kilometrina,
        lokacija: lokacija,
        opis: opis,
        oseba: oseba, // email referenca na userja
      };

      db.collection("Potni_stroski").doc(id).set(novStrosek);
      return { message: "Uspešno dodan potni strošek", strosek: novStrosek };
    } catch (error) {
      throw new Error(
        "Napaka pri dodajanju potnega stroška v bazo: " + error.message
      );
    }
  }

  static async getAll(limit, offset) {
    try {
      const stroskiRef = db
        .collection("Potni_stroski")
        .limit(limit)
        .offset(offset);
      const response = await stroskiRef.get();
      const stroski = [];
      response.forEach((doc) => {
        stroski.push(doc.data());
      });

      return stroski;
    } catch (error) {
      throw new Error(
        "Napaka pri pridobivanju stroskov iz baze: " + error.message
      );
    }
  }

  static async getById(id) {
    try {
      const strosekRef = db.collection("Potni_stroski").doc(id);
      const response = await strosekRef.get();
      const strosek = response.data();

      return strosek;
    } catch (error) {
      throw new Error(
        "Napaka pri pridobivanju stroska iz baze: " + error.message
      );
    }
  }

  static async put(id, updatedData) {
    try {
      const strosekRef = db.collection("Potni_stroski").doc(id);
      const response = await strosekRef.get();
      const strosek = response.data();
      if (strosek == undefined) {
        throw new Error("Potni strošek ne obstaja");
      }

      if (updatedData.geslo) {
        updatedData.geslo = await hashPassword(updatedData.geslo);
      }

      const novStrosek = {
        ...strosek,
        ...updatedData,
      };

      await db.collection("Potni_stroski").doc(id).set(novStrosek);

      return { message: "Potni strošek je uspešno posodobljen" };
    } catch (error) {
      throw new Error(
        "Napaka pri posodabljanju potnega stroška v bazi: " + error.message
      );
    }
  }

  static async delete(id) {
    try {
      const strosekRef = db.collection("Potni_stroski").doc(id);
      const response = await strosekRef.get();
      const strosek = response.data();
      if (strosek == undefined) {
        throw new Error("Strosek ne obstaja");
      }
      await db.collection("Potni_stroski").doc(id).delete();

      return { message: "Strosek je bil izbrisan" };
    } catch (error) {
      throw new Error("Napaka pri brisanju stroska iz baze: " + error.message);
    }
  }

  static async getByEmails(emails) {
    try {
      const stroskiRef = db.collection("Potni_stroski");
      const response = await stroskiRef.where("oseba", "in", emails).get();
      const stroski = [];
      response.forEach((doc) => {
        stroski.push(doc.data());
      });

      return stroski;
    } catch (error) {
      throw new Error(
        "Napaka pri pridobivanju potnih stroškov iz baze: " + error.message
      );
    }
  }
}

module.exports = Expense;