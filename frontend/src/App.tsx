import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTravelExpenses from './components/AllTravelExpenses';
import CreateTravelExpenses from './components/CreateTravelExpenses';
import TravelExpense from "./components/TravelExpense";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CreateTravelExpenses />} />
          <Route path="/expenses" element={<AllTravelExpenses />} />
            <Route path="/expenses/:id" element={<TravelExpense />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
