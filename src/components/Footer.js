import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row gy-4">
          {/* Brand Story */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <i className="fa-solid fa-blog me-2"></i>Blog
            </h5>
            <p className="">
              Welcome to Blog — your space for powerful stories and smart
              insights. Whether you're a writer or reader, there's always
              something for you.
            </p>
            <p className="text-info fw-semibold mt-3">
              ✨ Explore, write, and grow with us!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link className="text-white text-decoration-none" to="/">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/blogs">
                  📝 Blogs
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/users">
                  👥 Users
                </Link>
              </li>
              <li>
                <Link
                  className="text-white text-decoration-none"
                  to="/register"
                >
                  🆕 Register
                </Link>
              </li>
              <li>
                <Link className="text-white text-decoration-none" to="/login">
                  🔐 Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Box */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex flex-wrap gap-3">
              <a
                href="https://twitter.com"
                className="text-white fs-4"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://facebook.com"
                className="text-white fs-4"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-white fs-4"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="text-white fs-4"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="mailto:support@blog.com" className="text-white fs-4">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-secondary my-4" />

        {/* Bottom Copyright */}
        <div className="text-center">
          <p className="mb-1">
            &copy; 2025 <strong>Blog</strong>{" "}
            <i className="fa-solid fa-blog fa-beat text-danger"></i>. All rights
            reserved.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter text-primary fs-5"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin text-primary fs-5"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <i className="fab fa-github fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
