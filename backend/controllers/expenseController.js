const Expense = require("../models/expense");
const User = require("../models/user");
const db = require("../db");

async function dodajStrosek(req, res) {
  const { datum_odhoda, datum_prihoda, kilometrina, lokacija, opis, oseba } =
    req.body;

  if (
    !datum_odhoda ||
    !datum_prihoda ||
    !kilometrina ||
    !lokacija ||
    !opis ||
    !oseba
  ) {
    return res.status(400).json({ error: "Vsa polja morajo biti izpolnjena" });
  }

  try {
    const novStrosek = await Expense.add(
      datum_odhoda,
      datum_prihoda,
      kilometrina,
      lokacija,
      opis,
      oseba
    );

    res.status(200).json({ strosek: novStrosek });
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
}

async function vsiStroski(req, res) {
  const { page, limit } = req.query;
  const limitValue = parseInt(limit);
  const offsetValue = (parseInt(page) - 1) * limitValue;

  try {
    const stroski = await Expense.getAll(limitValue, offsetValue);
    const totalItems = (await db.collection("Potni_stroski").get()).size;

    res.status(200).json({
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limitValue),
      data: stroski,
    });
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
}

async function najdiStrosek(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "Potreben je id." });
  }

  try {
    const strosek = await Expense.getById(id);
    if (!strosek) {
      return res.status(404).json({ error: "Strosek ne obstaja" });
    }
    res.status(200).json(strosek);
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
}

async function spremeniStrosek(req, res) {
  const { id } = req.params;
  const updatedData = req.body;

  if (!id) {
    return res.status(400).send({ error: "Potreben je id." });
  }

  try {
    const response = await Expense.put(id, updatedData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
}

async function izbrisiStrosek(req, res) {
  const { id } = req.params;
  try {
    const strosek = await Expense.delete(id);
    if (!strosek) {
      return res.status(404).json({ error: "Strosek ne obstaja" });
    }
    res.status(200).json({ message: "Strosek uspešno izbrisan" });
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
}

async function stroskiPoOsebi(req, res) {
  const { imePriimek } = req.query;

  if (!imePriimek || imePriimek.trim().split(" ").length < 2) {
    return res
      .status(400)
      .json({ error: "Parameter 'imePriimek' mora vsebovati ime in priimek." });
  }

  const [ime, priimek] = imePriimek.trim().split(" ");
  console.log(ime);
  console.log(priimek);

  try {
    const uporabniki = await User.getByFullName(ime, priimek);
    if (uporabniki.length === 0) {
      return res
        .status(404)
        .json({ error: "Uporabnik s tem imenom in priimkom ni najden." });
    }

    const emails = uporabniki.map((uporabnik) => uporabnik.email);

    const stroski = await Expense.getByEmails(emails);
    if (stroski.length === 0) {
      return res
        .status(404)
        .json({ error: "Delavec še nima prijavljenih potnih stroškov." });
    }

    res.status(200).json(stroski);
  } catch (error) {
    res.status(500).json({ details: error.message });
  }
}

module.exports = {
  dodajStrosek,
  vsiStroski,
  najdiStrosek,
  spremeniStrosek,
  izbrisiStrosek,
  stroskiPoOsebi,
};