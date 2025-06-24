import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const { name } = useParams();
  const [users, setUsers] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://blogapp-server-wa7m.onrender.com/api/users/?name=${name}`
        );
        setUsers(res.data[0]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setLoading(false);
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
        console.error("Error fetching user blogs:", err);
      }
    };
    fetchUserBlog();
  }, [name]);

  if (loading || !users?.name)
    return <h2 className="text-center mt-5">Loading profile...</h2>;

  return (
    <section className="bg-light min-vh-100">
      {/* Profile Banner */}
      <div
        className="text-white text-center py-5"
        style={{
          background: "linear-gradient(to right, #1f1c2c, #6852ff)",
        }}
      >
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${users.name}`}
          alt="avatar"
          className="rounded-circle border border-white mb-3"
          style={{ width: "110px", height: "110px" }}
        />
        <h1 className="display-5 fw-bold">
          {users.name}
          <i className="fa-solid fa-circle-check text-info ms-2"></i>
        </h1>
        <p className="lead mb-1">
          {users.study || "Blogger | Learner | Dreamer"}
        </p>
        <p className="text-light fst-italic small">
          "Words can change the world – write them wisely."
        </p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="/blogs" className="btn btn-sm btn-light px-4">
            Explore Blogs
          </Link>
          <Link to="/register" className="btn btn-sm btn-outline-light px-4">
            Become a Writer
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mt-5">
        <div className="row text-center mb-4">
          <div className="col-md-4 mb-4">
            <h5 className="text-dark fw-bold">🧾 About Me</h5>
            <p className="text-muted">
              {users.bio || "This user hasn't added a bio yet."}
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-dark fw-bold">🔗 Social</h5>
            <div className="fs-5">
              {users.instagram && (
                <a
                  href={users.instagram}
                  className="me-3 text-danger"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {users.linkedin && (
                <a
                  href={users.linkedin}
                  className="text-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="text-dark fw-bold">📞 Contact</h5>
            <p className="text-muted mb-0">
              Email: {users.email || "--@gmail.com"}
              <br />
              Phone: {users.phone || "+91 ----"}
            </p>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="border-top pt-4 mt-4">
          <h4 className="fw-bold mb-4">
            📝 Blogs by {users.name.split(" ")[0]}
          </h4>
          <div className="row">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow rounded-4 border-0">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-primary fw-bold">
                        {blog.title.length > 60
                          ? blog.title.slice(0, 60) + "..."
                          : blog.title}
                      </h5>
                      <p className="card-text text-muted small mb-3">
                        {blog.description.length > 100
                          ? blog.description.slice(0, 100) + "..."
                          : blog.description}
                      </p>
                      <Link
                        to={`/blog/${blog._id}`}
                        className="btn btn-sm btn-outline-primary mt-auto"
                      >
                        Read Full Blog{" "}
                        <i className="fa-solid fa-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted fst-italic">
                No blogs created by {users.name}.
              </p>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white text-center rounded-4 mt-5 p-4 shadow-sm border">
          <h5 className="fw-bold mb-2">
            Ready to share your ideas with the world?
          </h5>
          <p className="text-muted">
            Join thousands of creators and inspire others with your words.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/blogs" className="btn btn-primary">
              Explore Blogs
            </Link>
            <Link to="/register" className="btn btn-outline-dark">
              Start Writing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
