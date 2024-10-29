import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTravelExpenses from './components/AllTravelExpenses';
import CreateTravelExpenses from './components/CreateTravelExpenses';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CreateTravelExpenses />} />
          <Route path="/expenses" element={<AllTravelExpenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
