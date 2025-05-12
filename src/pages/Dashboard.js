import React, { useEffect, useState } from "react";
import { Button, Container, Card, Row, Col, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loggedInUserName = localStorage.getItem("name");
  const loggedInUserEmail = localStorage.getItem("email");
  const loggedInUser_id = localStorage.getItem("_id");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://blogapp-server-wa7m.onrender.com/api/users/?name=${loggedInUserName}`
        );
        setUsers(res.data[0]);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [loggedInUserName]);

  useEffect(() => {
    axios
      .get(
        `https://blogapp-server-wa7m.onrender.com/api/blogs/?userEmail=${loggedInUserEmail}`
      )
      .then((response) => {
        setPosts(response.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        alert("Failed to load your posts. Please try again later.");
        setLoading(false);
      });
  }, [loggedInUserEmail]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(
          `https://blogapp-server-wa7m.onrender.com/api/blogs/${id}`
        );
        setPosts(posts.filter((post) => post._id !== id)); // Update state after deletion
        alert("Post deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Error deleting post.");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      try {
        await axios.delete(
          `https://blogapp-server-wa7m.onrender.com/api/users/${id}`
        );
        alert("Your account has been deleted successfully.");
        localStorage.clear();
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error deleting account.");
      }
    }
  };

  return (
    <div>
      <Container className="mt-2">
        <h2 className="text-center mb-4">Welcome to Your Dashboard</h2>

        {/* user profile */}
        <div>
          {" "}
          <div
            className="card mx-auto text-center"
            style={{ maxWidth: "600px" }}
          >
            <h2 className="pt-3">
              <i className="fa-solid fa-user"></i>
            </h2>
            <div className="card-body">
              <h4 className="card-title">{users.name}</h4>
              <p className="card-text">{users.study}</p>

              <Navbar expand="lg" bg="" variant="dark">
                <Container>
                  <Navbar.Brand>
                    {/* <i className="fa-solid fa-blog fa-bounce"></i>log */}
                  </Navbar.Brand>
                  <div className="ml-auto d-flex">
                    <Link
                      to={`/edit-user/${loggedInUser_id}`}
                      className="btn btn-warning mx-2"
                    >
                      Edit Profile
                    </Link>
                    <Button variant="danger" onClick={handleLogout}>
                      Logout <i className="fa-solid fa-sign-out-alt"></i>
                    </Button>
                    <Button
                      variant="light"
                      className="text-danger mx-2"
                      onClick={() => handleDeleteUser(loggedInUser_id)}
                    >
                      Delete Account <i className="fa-solid fa-trash-alt"></i>
                    </Button>
                  </div>
                  <Navbar.Brand>
                    {/* <i className="fa-solid fa-blog fa-bounce"></i>log */}
                  </Navbar.Brand>
                </Container>
              </Navbar>
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
        </div>

        <div className="text-center">
          <Link to="/create/blog" className="btn btn-primary mb-4">
            <i className="fa-solid fa-pen-to-square"></i> Create New Blog
          </Link>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <Row>
            {posts.length > 0 ? (
              posts.map((post) => (
                <Col md={4} key={post._id} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>
                        {post.description.substring(0, 100)}...
                      </Card.Text>
                      <Link
                        to={`/blog/${post._id}`}
                        className="btn btn-outline-secondary mb-2"
                      >
                        View Full Blog
                      </Link>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="secondary"
                          onClick={() => navigate(`/edit-blog/${post._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          Delete <i className="fa-solid fa-trash"></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">You have not created any blogs yet.</p>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DashboardPage;
