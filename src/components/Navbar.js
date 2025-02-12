import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setIsLoggedIn(!!userEmail); // make boolean (true when exists, false when it is empty)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email"); // clear user data from local storage
    localStorage.removeItem("name");
    localStorage.removeItem("_id");
    setIsLoggedIn(false); // update state
    window.location.reload(); // refresh to see changes
  };

  const loggedInUserName = localStorage.getItem("name");
  const loggedInUserEmail = localStorage.getItem("email");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info justify-content-between p-3">
      <Link className="navbar-brand fw-bold text-white d-flex" to="/">
        <h3>
          <i class="fa-solid fa-blog fa-bounce"></i>log <button className="btn btn-light">Home</button>
        </h3>
      </Link>

      <div className="ml-auto ">
        {!isLoggedIn ? (
          <>
            <button
              className="navbar-toggler mb-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse  flex-direction-row"
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto d-flex align-items-center">
                <li className="nav-item">
                  <Link to="/register" className="btn btn-secondary mx-2 mb-1">
                    <i class="fa-solid fa-user-plus"></i> Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary mx-2 mb-1">
                    <i class="fa-solid fa-right-to-bracket"></i> Login
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link className="btn btn-primary mx-2" to={`/profile/${loggedInUserName}`}>
              <i class="fa-regular fa-user"></i>Profile
            </Link>

            <button className="btn btn-danger" onClick={handleLogout}>
              Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
