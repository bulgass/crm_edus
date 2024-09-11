import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './providers/authprovider/AuthProvider';
import Login from "./components/pages/auth/Login/login";
import Signup from "./components/pages/auth/Signup/signup";
import Home from "./components/homepage";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
        <Routes>
          {user ? (
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
