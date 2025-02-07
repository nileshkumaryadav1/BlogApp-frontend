// import { useState } from "react";
// import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = () => {
//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }
//     setError("");
//     console.log("Logging in with", email, password);
//     // Add authentication logic here
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", padding: "20px" }}>
//       <div className="card p-4 shadow-lg rounded" style={{ background: "rgba(255, 255, 255, 0.9)", width: "100%", maxWidth: "400px" }}>
//         <div className="card-header text-center bg-transparent border-0">
//           <h5 className="card-title text-primary fw-bold">Login</h5>
//         </div>
//         <div className="card-body">
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
//           {error && <p className="text-danger text-sm mb-2">{error}</p>}
//           <button className="btn btn-primary w-100 btn-lg fw-bold shadow-sm" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Simple validation
//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }

//     // Simulate a login API call
//     if (username === 'admin' && password === 'password') {
//       // Redirect to the dashboard after successful login
//       navigate('/dashboard');
//     } else {
//       setError('Invalid username or password.');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
//       <h1>Login</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter username"
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Validate inputs
//     if (!email || !password) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // Make API call to a login API
//       const response = await axios.post('http://localhost:4000/api/users/login', {
//         email,
//         password,
//       });

//       // Simulate a successful login response
//       console.log(response.config.data);
     
//       if (response.status === 200) {
//         console.log('Login successful:', response.data);
//         console.log('login')
//         alert('Login successful! 🎉');
//         // Redirect to the dashboard after successful login
//         // navigate('/home');
//       } else {
//         console.log("not", "login")
//         setError('Invalid email or password.');
//       }
//     } catch (err) {
//       console.error('Login login api tak response nhi gaya not work :', err);
//       setError('An error occurred.api not work.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
//       <h1>Login</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter email"
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://blogapp-server-wa7m.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        toast.success("Login successful! 🎉");
        localStorage.setItem("name", data.user.name); // Save name to local storage
        localStorage.setItem("email", data.user.email); // Save email to local storage

        alert( 'Login successful! 🎉');

        navigate('/home');
      } else {
        console.log("not login")
        toast.error(data.message || "Invalid credentials!");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
