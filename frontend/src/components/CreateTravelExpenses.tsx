import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { IExpense } from "../models/expenses";

const CreateExpenseComponent: React.FC = () => {
  const [expense, setExpense] = useState<IExpense>({
    id: "",
    naziv: "",
    datum_odhoda: "",
    datum_prihoda: "",
    kilometrina: 0,
    lokacija: "",
    opis: "",
    oseba: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:9000/strosek/dodaj",
        expense
      );
      setSuccessMessage("Strošek je bil uspešno dodan!");
      console.log("Expense added:", response.data);

      setExpense({
        id: "",
        naziv: "",
        datum_odhoda: "",
        datum_prihoda: "",
        kilometrina: 0,
        lokacija: "",
        opis: "",
        oseba: "",
      });
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error ||
          "Prišlo je do napake pri dodajanju stroška."
      );
      console.error("Napaka pri dodajanju stroška:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Dodaj nov strošek
        </Typography>

        {successMessage && (
          <Typography
            variant="body1"
            color="primary"
            gutterBottom
            align="center"
          >
            {successMessage}
          </Typography>
        )}

        {errorMessage && (
          <Typography variant="body1" color="error" gutterBottom align="center">
            {errorMessage}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Naziv"
                name="naziv"
                value={expense.naziv}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Datum odhoda"
                name="datum_odhoda"
                type="date"
                value={expense.datum_odhoda}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Datum prihoda"
                name="datum_prihoda"
                type="date"
                value={expense.datum_prihoda}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Kilometrina"
                name="kilometrina"
                type="number"
                value={expense.kilometrina}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Lokacija"
                name="lokacija"
                value={expense.lokacija}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Opis"
                name="opis"
                value={expense.opis}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Oseba (email)"
                name="oseba"
                value={expense.oseba}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Dodaj strošek
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateExpenseComponent;
