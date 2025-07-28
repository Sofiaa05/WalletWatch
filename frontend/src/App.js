import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Dashboard/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';  
import NotFound from './pages/NotFound';
import { Navigate } from 'react-router-dom';
import UserProvider from './context/userContext';
import { Toaster } from 'react-hot-toast';
import History from './pages/History';

const App = () => {
  return (
    <UserProvider>
    <div>
        <Router>
          <Routes> 
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />} /> {/* Fallback route */}
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          },
        }}
      />
    </UserProvider>
  );
}

export default App

const Root = () => {
  //check if token exists in localStorage
  // This is a simple way to check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated
  
  //return to dashboard if authenticated, otherwise return to login page
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

