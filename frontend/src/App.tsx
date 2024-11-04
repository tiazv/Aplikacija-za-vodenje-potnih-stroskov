import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTravelExpenses from './components/AllTravelExpenses';
import CreateTravelExpenses from './components/CreateTravelExpenses';
import Navbar from './components/Navbar';
import TravelExpense from "./components/TravelExpense";
import EditExpense from "./components/EditExpense";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<AllTravelExpenses />} />
          <Route path="/dodaj-strosek" element={<CreateTravelExpenses />} />
          <Route path="/edit/:id" element={<EditExpense/>} />
          <Route path="/details/:id" element={<TravelExpense/>} />
        </Routes>
    </Router>
  );
}

export default App;
