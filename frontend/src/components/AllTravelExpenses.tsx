import React from 'react';
import {
  Container,
  Typography,
  Paper
  
} from '@mui/material';

const AllTravelExpenses: React.FC = () => {

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          marginTop: 4,
          textAlign: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h3" color="primary" gutterBottom>
          Aplikacija za vodenje potnih stroškov
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          Pregled vseh potnih stroškov
        </Typography>
      </Paper>
    </Container>
  );
};

export default AllTravelExpenses;
