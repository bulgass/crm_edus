import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './providers/authProvider/authProvider'; // Проверь путь к authProvider
import Login from "./components/pages/auth/login/login";
import Signup from "./components/pages/auth/signup/signup";
import Home from "./components/pages/home/homepage";

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          {currentUser ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
