import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import urlConfig from '../../config/urlConfig'; 
import { useAppContext } from '../../context/AuthContext'; 
import { useNavigate } from 'react-router-dom'; 


function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Task 4: Include a state for incorrect password.
  const [incorrect, setIncorrect] = useState("");
  // Task 5: Create a local variable for navigate, bearerToken and setIsLoggedIn.
  const navigate = useNavigate();
  const bearerToken = sessionStorage.getItem('auth-token');
  const { setIsLoggedIn } = useAppContext();

  // Task 6: If the bearerToken has a value (user already logged in), navigate to MainPage
  useEffect(() => {
    if (bearerToken) {
      navigate('/app');
    }
  }, [navigate, bearerToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleLogin = async () => {
    setIncorrect("");
    try {
      const response = await fetch(`${urlConfig}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const json = await response.json();
      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', json.userName);
        sessionStorage.setItem('email', json.userEmail);
        setIsLoggedIn(true);
        navigate('/app');
      } else {
        setFormData({ email: '', password: '' });
        setIncorrect(json.error || 'Wrong password. Try again.');
        setTimeout(() => {
          setIncorrect("");
        }, 2000);
      }
    } catch (e) {
      setFormData({ email: '', password: '' });
      setIncorrect("Error fetching details: " + e.message);
      setTimeout(() => {
        setIncorrect("");
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          {incorrect && <div className="alert alert-danger text-danger">{incorrect}</div>}
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>
        </form>
        <p className="login-footer">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
