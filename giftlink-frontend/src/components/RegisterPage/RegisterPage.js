import React, { useState } from "react";
import "./RegisterPage.css";
import urlConfig from '../../config/urlConfig'; // Task 1
import { useAppContext } from '../../context/AuthContext'; // Task 2
import { useNavigate } from 'react-router-dom'; // Task 3

function RegisterPage() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Task 4: Include a state for error message.
  const [showerr, setShowerr] = useState("");
  // Task 5: Create a local variable for navigate and setIsLoggedIn.
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleRegister = async () => {
    setShowerr("");
    if (formData.password !== formData.confirmPassword) {
      setShowerr("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${urlConfig}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        }),
      });
      const json = await response.json(); // Task 1
      if (json.authtoken) {
        // Task 2: Set user details in session storage
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', formData.firstName);
        sessionStorage.setItem('email', json.email);
        setIsLoggedIn(true); // Task 3
        navigate('/app'); // Task 4
      } else if (json.error) {
        setShowerr(json.error); // Task 5
      } else {
        setShowerr('Registration failed');
      }
    } catch (e) {
      setShowerr("Error fetching details: " + e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          {showerr && <div className="alert alert-danger text-danger">{showerr}</div>}

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your last name"
              required
            />
          </div>

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

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
