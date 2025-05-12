import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoadingUsers(false));
  }, []);

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center fw-bold">
        <i className="fa-solid fa-users me-2"></i>All Users
      </h3>

      {loadingUsers ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-muted text-center">No creators found.</p>
      ) : (
        <div className="row">
          {users.map((user) => (
            <div
              key={user._id}
              className="col-12 col-md-6 col-lg-4 mb-4 d-flex"
            >
              <div className="card shadow-sm w-100">
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold mb-2">{user.name}</h5>
                  <div className="mb-3 d-flex justify-content-center gap-3">
                    {user.instagram && (
                      <a
                        href={user.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa-brands fa-instagram fs-5 text-danger"></i>
                      </a>
                    )}
                    {user.linkedin && (
                      <a
                        href={user.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="fa-brands fa-linkedin fs-5 text-primary"></i>
                      </a>
                    )}
                  </div>
                  <Link
                    to={`/profile/${user.name}`}
                    className="btn btn-outline-primary btn-sm w-100"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllUser;
