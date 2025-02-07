import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail"); 
        setIsLoggedIn(!!userEmail); // Convert to boolean (true if exists, false if null)
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userEmail"); // Clear user data
        setIsLoggedIn(false); // Update state
        window.location.reload(); // Refresh to reflect changes
    };

    const LoggedInUserName = localStorage.getItem('name');
    const loggedInUserEmail = localStorage.getItem('email');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-info justify-content-between p-3">
            <Link className="navbar-brand fw-bold text-white" to="/">My Blog</Link>
            <div>
            <Link to='/home' className="navbar-brand fw text-white" >Hi {LoggedInUserName} !</Link>
            <Link className="btn btn-primary mx-2" to="/home">Profile page</Link>
            </div>
            <div className="ml-auto ">
                {!isLoggedIn ? (
                    <>
                        <Link className="btn btn-secondary" to="/register">Register</Link>
                        <Link className="btn btn-primary mx-2" to="/login">Login</Link>
                    </>
                ) : (
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
