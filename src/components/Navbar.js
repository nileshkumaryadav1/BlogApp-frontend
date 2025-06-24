import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setIsLoggedIn(!!userEmail);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setVisible(true);
      } else if (window.scrollY > lastScrollY) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("_id");
    setIsLoggedIn(false);
    setMenuOpen(false);
    window.location.reload();
  };

  const loggedInUserName = localStorage.getItem("name");
  const closeMenu = () => setMenuOpen(false);

  return (
    <section>
      <nav
        className={`navbar navbar-expand-lg bg-info shadow-sm py-3 px-4 d-flex justify-content-between align-items-center fixed-top transition-navbar ${
          visible ? "show-navbar" : "hide-navbar"
        }`}
      >
        <Link className="navbar-brand text-white fw-bold fs-4" to="/">
          <i className="fa-solid fa-blog me-2"></i>Blog
        </Link>

        <button
          className="btn text-white d-lg-none fs-4"
          onClick={() => setMenuOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="d-none d-lg-flex gap-3 align-items-center">
          <Link className="text-white text-decoration-none fw-semibold" to="/">
            Home
          </Link>
          <Link
            className="text-white text-decoration-none fw-semibold"
            to="/users"
          >
            Users
          </Link>
          <Link
            className="text-white text-decoration-none fw-semibold"
            to="/blogs"
          >
            Blogs
          </Link>

          {/* {isLoggedIn && (
            <Link
              className="text-white text-decoration-none fw-semibold"
              to={`/profile/${loggedInUserName}`}
            >
              Profile
            </Link>
          )} */}

          <Link
            className="text-white text-decoration-none fw-semibold"
            to="/profile"
          >
            Dashboard
          </Link>

          {!isLoggedIn ? (
            <>
              <Link className="btn btn-outline-light" to="/register">
                Register
              </Link>
              <Link className="btn btn-secondary" to="/login">
                Login
              </Link>
            </>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header d-flex justify-content-between align-items-center px-4 py-3">
          <h5 className="text-white m-0">Menu</h5>
          <button className="btn text-white fs-4" onClick={closeMenu}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <ul className="list-unstyled px-4 mt-4">
          <li>
            <Link onClick={closeMenu} to="/">
              🏠 Home
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/users">
              👥 Users
            </Link>
          </li>
          <li>
            <Link onClick={closeMenu} to="/blogs">
              📝 Blogs
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link onClick={closeMenu} to={`/profile/${loggedInUserName}`}>
                🙍‍♂️ Profile
              </Link>
            </li>
          )}
          {!isLoggedIn ? (
            <>
              <li>
                <Link onClick={closeMenu} to="/register">
                  🆕 Register
                </Link>
              </li>
              <li>
                <Link onClick={closeMenu} to="/login">
                  🔐 Login
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button className="btn btn-danger mt-2" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Navbar;
