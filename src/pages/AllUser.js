import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoadingUsers(false));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-light py-5 min-vh-100">
      <div className="container">
        <h3 className="text-center fw-bold mb-4">
          <i className="fa-solid fa-users me-2 text-primary"></i>All Users
        </h3>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search creators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {loadingUsers ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-muted text-center">No creators found.</p>
        ) : (
          <div className="row">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="col-md-6 col-lg-4 mb-4 d-flex"
              >
                <div className="card text-center w-100 shadow-sm border-0 rounded-4">
                  <div className="card-body">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt="avatar"
                      className="rounded-circle mb-3"
                      style={{ width: "70px", height: "70px" }}
                    />
                    <h5 className="fw-semibold mb-1">{user.name}</h5>
                    <p className="text-muted small mb-2">{user.study || "Blogger"}</p>
                    <div className="mb-3 d-flex justify-content-center gap-3">
                      {user.instagram && (
                        <a href={user.instagram} target="_blank" rel="noreferrer">
                          <i className="fa-brands fa-instagram fs-5 text-danger"></i>
                        </a>
                      )}
                      {user.linkedin && (
                        <a href={user.linkedin} target="_blank" rel="noreferrer">
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
    </div>
  );
}

export default AllUser;
