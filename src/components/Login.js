
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

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

        navigate('/profile');
      } else {
        console.log("not login")
        toast.error(data.message || "Invalid credentials!");
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      toast.error("Something went wrong. Try again!");
      setError('An error occurred. Please try again.');
    }finally {
      setLoading(false);
    }
  };

  return (

    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", padding: "20px" }}>
        
    <form onSubmit={handleLogin}>
    <div className="card p-4 shadow-lg rounded" style={{ background: "rgba(255, 255, 255, 0.9)", width: "100%", maxWidth: "400px" }}>
    {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="card-header text-center bg-transparent border-0">
           <h1 className="card-title text-primary fw-bold ">Login</h1>
       </div>

      <input
        type="email"
        placeholder="Email"
        className="form-control form-control-lg border-primary mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control form-control-lg border-primary mb-3 "
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold shadow-sm mb-3" disabled={loading}>
      {loading ? 'Loging in...' : 'Login'}
      </button>

      <p>
        Do not have an account? <a href="/register">Register here</a>.
      </p>

      </div>  
    </form>

    </div>
  );
};

export default Login;
