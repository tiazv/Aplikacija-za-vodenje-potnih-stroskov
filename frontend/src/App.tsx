import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllTravelExpenses from './components/AllTravelExpenses';
import CreateTravelExpenses from './components/CreateTravelExpenses';
import Navbar from './components/Navbar';
import UserExpenseOverview from './components/UserExpensesOverview';
import { AuthContextProvider } from './context/AuthContext';
import Login from './validation/Login';
import Register from './validation/Registration';
import Logout from './validation/Logout';
import Routing from './components/Routing';
import UserRouting from './components/UserRouting';
import EmployeeRouting from './components/EmployeeRouting';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
          <Routes>
            <Route path='' element={<Routing />}>
              <Route path="/" element={<AllTravelExpenses />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            
            <Route path="/dodaj-strosek" element={<CreateTravelExpenses />} />
            <Route path="/user/:email/expenses" element={<UserExpenseOverview />} />
          </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
