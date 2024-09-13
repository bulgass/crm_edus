import React, { useState } from 'react';
import { useAuth } from '../../../../providers/authProvider/authProvider'; 
import { useNavigate } from 'react-router-dom'; 
import './login.css';


const AuthForm = () => {
  const { signup, login } = useAuth(); 
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); 
  const [role, setRole] = useState('worker'); 



  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, role);
      navigate('/'); 
    } catch (error) {
      alert('Failed to sign up: ' + error.message);
    }
  };

  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); 
    } catch (error) {
      alert('Failed to login: ' + error.message);
    }
  };

  
  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="container_auth">
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      {error && <p className="error-message">{error}</p>}
      
      <div className={`form-container sign-up ${isSignUp ? 'active' : ''}`}>
        <form onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div class="select-container">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="worker">Worker</option>
            </select>
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      
      <div className={`form-container sign-in ${!isSignUp ? 'active' : ''}`}>
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel toggle-left ${isSignUp ? 'active' : ''}`}>
            <h1>CRM</h1>
            <p>Write your email to signup</p>
            <button className="hidden" id="login" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className={`toggle-panel toggle-right ${!isSignUp ? 'active' : ''}`}>
            <h1>CRM</h1>
            <p>Login with ypur email</p>
            <button className="hidden" id="register" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AuthForm;
