import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setIsLoggedIn(!!userEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("_id");
    setIsLoggedIn(false);
    window.location.reload();
  };

  const loggedInUserName = localStorage.getItem("name");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info px-4 py-3 shadow-sm">
      <Link className="navbar-brand d-flex align-items-center text-white" to="/">
        <h4 className="mb-0">
          <i className="fa-solid fa-blog fa-bounce me-2"></i>Blog
        </h4>
        <button className="btn btn-light btn-sm ms-3">Home</button>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        {!isLoggedIn ? (
          <ul className="navbar-nav d-flex align-items-center gap-2">
            <li className="nav-item">
              <Link to="/register" className="btn btn-outline-light">
                <i className="fa-solid fa-user-plus me-1"></i> Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-light">
                <i className="fa-solid fa-right-to-bracket me-1"></i> Login
              </Link>
            </li>
          </ul>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <Link
              className="btn btn-light"
              to={`/profile/${loggedInUserName}`}
            >
              <i className="fa-regular fa-user me-1"></i> Profile
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
