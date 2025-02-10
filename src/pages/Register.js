
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

import toast from "react-hot-toast";

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Make api call
      const response = await axios.post('https://blogapp-server-wa7m.onrender.com/api/users', {
        name,
        email,
        password,
      });

      // Simulate a successful registration response
      if (response.status === 201) {
        alert( 'Registeration successful! 🎉');
        toast.success("Registration successful! 🎉");
        // Redirect to the login page after successful registration
        navigate('/login');
      } else {
        toast.error("Registration failed. Try again!");
        console.log('Registration failed:', response.data);
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      toast.error("Registration failed and caught in catch. Try again!");
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", padding: "20px" }}>

    <div className="card p-4 shadow-lg rounded" style={{ background: "rgba(255, 255, 255, 0.9)", width: "100%", maxWidth: "400px" }}>
      <h1 className="card-title text-primary fw-bold d-flex justify-content-center align-items-center" >Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegistration}>
      <div className="card-body">
        <div className="mb-3" >
          <label>Name:</label>
          <input
            type="text"
            value={name}
            className="form-control form-control-lg border-primary mb-1"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-3" >
          <label>Email:</label>
          <input
            type="email"
            value={email}
            className="form-control form-control-lg border-primary mb-1"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3" >
          <label>Password:</label>
          <input
            type="password"
            value={password}
            className="form-control form-control-lg border-primary mb-3"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="btn btn-primary w-100 btn-lg fw-bold shadow-sm mb-2" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div> 
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  </div>
  );
};

export default Registration;