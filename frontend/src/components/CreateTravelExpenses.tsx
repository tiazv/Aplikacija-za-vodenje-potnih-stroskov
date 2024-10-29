import React, { useState } from 'react';
import axios from 'axios';

import { Container, TextField, Button, Typography } from '@mui/material';
import { IExpense } from '../models/expenses';

const CreateExpenseComponent: React.FC = () => {
  const [expense, setExpense] = useState<IExpense>({
    id: '',
    datum_odhoda: '',
    datum_prihoda: '',
    kilometrina: 0,
    lokacija: '',
    opis: '',
    oseba: '',
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
      const response = await axios.post('http://localhost:9000/strosek/dodaj', expense);
      setSuccessMessage('Expense added successfully!');
      console.log('Expense added:', response.data);

      setExpense({
        id: '',
        datum_odhoda: '',
        datum_prihoda: '',
        kilometrina: 0,
        lokacija: '',
        opis: '',
        oseba: '',
      });
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.error || 'An error occurred while adding the expense'
      );
      console.error('Error adding expense:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Dodaj nov strošek
      </Typography>

      {successMessage && (
        <Typography variant="body1" color="primary" gutterBottom>
          {successMessage}
        </Typography>
      )}

      {errorMessage && (
        <Typography variant="body1" color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
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
        <TextField
          label="Kilometrina"
          name="kilometrina"
          type="number"
          value={expense.kilometrina}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Lokacija"
          name="lokacija"
          value={expense.lokacija}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Opis"
          name="opis"
          value={expense.opis}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Oseba (email)"
          name="oseba"
          value={expense.oseba}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Dodaj strošek
        </Button>
      </form>
    </Container>
  );
};

export default CreateExpenseComponent;
