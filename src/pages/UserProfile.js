import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const { name } = useParams();
  const [users, setUsers] = useState({});
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://blogapp-server-wa7m.onrender.com/api/users/?name=${name}`
        );
        setUsers(res.data[0]);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [name]);

  useEffect(() => {
    const fetchUserBlog = async () => {
      try {
        const res = await axios.get(
          `https://blogapp-server-wa7m.onrender.com/api/blogs/?userName=${name}`
        );
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching user blog:", err);
      }
    };
    fetchUserBlog();
  }, [name]);

  if (!users || !users.name) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="card mx-auto text-center" style={{ maxWidth: "600px" }}>
          <h2 className="pt-3">
            <i className="fa-solid fa-user"></i>
          </h2>
          <div className="card-body">
            <h4 className="card-title">{users.name}</h4>
            <p className="card-text">{users.study}</p>
            <Link to="/profile" className="btn btn-primary mx-2">
              Dashboard <i className="fa-regular fa-id-badge"></i>
            </Link>
          </div>
        </div>

        <div className="row mt-4 text-center">
          <div className="col-md-4 mb-3">
            <h3>About Me</h3>
            <p>{users.bio || "No bio available."}</p>
          </div>

          <div className="col-md-4 mb-3">
            <h3>Social Links</h3>
            <p>
              <a
                className="text-decoration-none d-block"
                href={users.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram me-2"></i>Instagram
              </a>
              <a
                className="text-decoration-none d-block"
                href={users.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin me-2"></i>LinkedIn
              </a>
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h3>Contact</h3>
            <p>
              Email: {users.email || "--@gmail.com"}
              <br />
              Phone: {users.phone || "+91 ----"}
            </p>
          </div>
        </div>

        <div className="border-top pt-3 mt-4">
          <h4 className="mb-3">Latest Blogs by {users.name}</h4>
          <div className="row">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{blog.title.slice(0, 40)}...</h5>
                      <p className="card-text">{blog.description.slice(0, 60)}...</p>
                      <div className="mt-auto">
                        <button className="btn btn-light btn-sm mb-2">
                          <i className="fa-solid fa-pen-nib me-1"></i>
                          Author: {blog.userName}
                        </button>
                        <Link
                          to={`/blog/${blog._id}`}
                          className="btn btn-outline-secondary w-100"
                        >
                          Read More <i className="fa-solid fa-book-open ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="fst-italic">{users.name} has not created any blogs yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
