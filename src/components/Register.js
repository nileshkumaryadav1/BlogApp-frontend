// import { useState } from "react";
// import bootstrap from "bootstrap/dist/css/bootstrap.min.css";


// export default function RegistrationPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleRegister = () => {
//     if (!name || !email || !password ) { // || !confirmPassword add if u want to add confirm password
//       setError("Please fill in all fields");
//       return;
//     }
//     // if (password !== confirmPassword) {
//     //   setError("Passwords do not match");
//     //   return;
//     // }
//     setError("");
//     console.log("Registering with", name, email, password);
//     // Add registration logic here

//     const response = fetch("http://localhost:4000/api/users", // Add your backend endpoint here for registration    
//       {method: "POST"},
//       async (req, res) => {
//       const body = req.body;
//       try {
//         if (!body || !body.name || !body.password || !body.email) {
//           return res.json({ message: "All fields are required..." });
//         }
    
//         const User = require("../models/User");

//         const result = await User.create({
//           name: body.name,
//           email: body.email,
//           password: body.password,
//         });
    
//         return res.json({ message: "User created successfully" });
//       } catch (error) {
//         return res.json("email already exist");
//       }
//     });

//     return response;
//   }
  

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", padding: "20px" }}>
//       <div className="card p-4 shadow-lg rounded" style={{ background: "rgba(255, 255, 255, 0.9)", width: "100%", maxWidth: "400px" }}>
//         <div className="card-header text-center bg-transparent border-0">
//           <h5 className="card-title text-primary fw-bold">Register</h5>
//         </div>
//         <div className="card-body">
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Full Name</label>
//             <input
//               type="text"
//               className="form-control form-control-lg border-primary"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your full name"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Email</label>
//             <input
//               type="email"
//               className="form-control form-control-lg border-primary"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label fw-semibold">Password</label>
//             <input
//               type="password"
//               className="form-control form-control-lg border-primary"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//             />
//           </div>
//           {/* <div className="mb-3">
//             <label className="form-label fw-semibold">Confirm Password</label>
//             <input
//               type="password"
//               className="form-control form-control-lg border-primary"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm your password"
//             />
//           </div> */}
//           {error && <p className="text-danger text-sm mb-2">{error}</p>}
//           <button className="btn btn-primary w-100 btn-lg fw-bold shadow-sm" onClick={handleRegister}>
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import toast, { Toaster } from 'react-hot-toast';

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
      // Make API call to a dummy registration API
      const response = await axios.post('https://blogapp-server-wa7m.onrender.com/api/users', {
        name,
        email,
        password,
      });

      // Simulate a successful registration response
      if (response.status === 201) {
        alert('Registration successful, Now you are redirected to login page');
        // Redirect to the login page after successful registration
        navigate('/login');
      } else {
        console.log('Registration failed:', response.data);
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegistration}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default Registration;