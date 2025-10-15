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
            <p>
              Welcome to <strong>Blog</strong> — your space for insightful stories 
              and smart ideas. Whether you're a writer or reader, there’s always 
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
              {[
                { path: "/", label: "🏠 Home" },
                { path: "/blogs", label: "📝 Blogs" },
                { path: "/users", label: "👥 Users" },
                { path: "/register", label: "🆕 Register" },
                { path: "/login", label: "🔐 Login" },
                { path: "/profile", label: "👤 Dashboard" },
              ].map((link, index) => (
                <li key={index}>
                  <Link className="text-white text-decoration-none" to={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex flex-wrap gap-3">
              {[
                { href: "https://twitter.com", icon: "fab fa-twitter", color: "text-info" },
                { href: "https://facebook.com", icon: "fab fa-facebook", color: "text-primary" },
                { href: "https://instagram.com", icon: "fab fa-instagram", color: "text-danger" },
                { href: "https://linkedin.com", icon: "fab fa-linkedin", color: "text-primary" },
                { href: "mailto:support@blog.com", icon: "fa-solid fa-envelope", color: "text-white" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`fs-4 ${social.color}`}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-secondary my-4" />

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="mb-1">
            &copy; 2025 <strong>Blog</strong>{" "}
            <i className="fa-solid fa-blog fa-beat text-danger"></i>. All rights reserved.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-2">
            {[
              { href: "https://twitter.com", icon: "fab fa-twitter text-primary fs-5" },
              { href: "https://linkedin.com", icon: "fab fa-linkedin text-primary fs-5" },
              { href: "https://github.com", icon: "fab fa-github fs-5" },
            ].map((social, index) => (
              <a key={index} href={social.href} target="_blank" rel="noreferrer">
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
