import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTravelExpenses from './components/AllTravelExpenses';
import CreateTravelExpenses from './components/CreateTravelExpenses';
import Navbar from './components/Navbar';
import DetailExpense from "./components/DetailExpense";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<AllTravelExpenses />} />
          <Route path="/dodaj-strosek" element={<CreateTravelExpenses />} />

          <Route path="/detail/:id" element={<DetailExpense />} />
        </Routes>
    </Router>
  );
}

export default App;
