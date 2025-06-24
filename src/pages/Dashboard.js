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
    axios
      .get(`https://blogapp-server-wa7m.onrender.com/api/users/?name=${loggedInUserName}`)
      .then((res) => setUsers(res.data[0]))
      .catch((err) => console.error("Error fetching user profile:", err));
  }, [loggedInUserName]);

  useEffect(() => {
    axios
      .get(`https://blogapp-server-wa7m.onrender.com/api/blogs/?userEmail=${loggedInUserEmail}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        alert("Failed to load your posts.");
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
        await axios.delete(`https://blogapp-server-wa7m.onrender.com/api/blogs/${id}`);
        setPosts(posts.filter((post) => post._id !== id));
        alert("Post deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("Error deleting post.");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        await axios.delete(`https://blogapp-server-wa7m.onrender.com/api/users/${id}`);
        alert("Account deleted successfully.");
        localStorage.clear();
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Error deleting account.");
      }
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        <h2 className="text-center fw-bold mb-5">👋 Welcome back, {loggedInUserName}</h2>

        {/* User Profile Card */}
        <Card className="shadow border-0 mx-auto text-center mb-5" style={{ maxWidth: "600px", borderRadius: "1.5rem" }}>
          <Card.Body>
            <h2 className="mb-3"><i className="fa-solid fa-user-circle text-primary"></i></h2>
            <h4 className="fw-semibold">{users.name}</h4>
            <p className="text-muted">{users.study || "Your field of study"}</p>
            <div className="d-flex justify-content-center gap-2 flex-wrap mt-3">
              <Link to={`/edit-user/${loggedInUser_id}`} className="btn btn-outline-warning">
                Edit Profile
              </Link>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
              <Button variant="danger" onClick={() => handleDeleteUser(loggedInUser_id)}>
                Delete Account
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Info Sections */}
        <Row className="text-center mb-5">
          <Col md={4}>
            <h5 className="text-dark">🧾 About Me</h5>
            <p className="text-muted">{users.bio || "No bio available."}</p>
          </Col>
          <Col md={4}>
            <h5 className="text-dark">🔗 Social Links</h5>
            <p>
              <a href={users.instagram} target="_blank" rel="noreferrer" className="d-block text-danger text-decoration-none">
                <i className="fab fa-instagram me-1"></i> Instagram
              </a>
              <a href={users.linkedin} target="_blank" rel="noreferrer" className="d-block text-primary text-decoration-none">
                <i className="fab fa-linkedin me-1"></i> LinkedIn
              </a>
            </p>
          </Col>
          <Col md={4}>
            <h5 className="text-dark">📞 Contact</h5>
            <p className="text-muted">
              Email: {users.email || "--@gmail.com"}
              <br />
              Phone: {users.phone || "+91 ----"}
            </p>
          </Col>
        </Row>

        {/* Create Blog CTA */}
        <div className="text-center mb-4">
          <Link to="/create/blog" className="btn btn-primary btn-lg">
            <i className="fa-solid fa-pen-to-square me-2"></i>Create New Blog
          </Link>
        </div>

        {/* User Blogs Section */}
        <h4 className="fw-bold mb-4">📝 Your Blogs</h4>
        {loading ? (
          <p className="text-center">Loading your blogs...</p>
        ) : posts.length > 0 ? (
          <Row>
            {posts.map((post) => (
              <Col md={6} lg={4} key={post._id} className="mb-4">
                <Card className="h-100 shadow-sm rounded-4">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-primary fw-semibold">{post.title}</Card.Title>
                    <Card.Text className="text-muted small mb-3">
                      {post.description.length > 100 ? post.description.slice(0, 100) + "..." : post.description}
                    </Card.Text>
                    <div className="mt-auto d-flex flex-column gap-2">
                      <Link to={`/blog/${post._id}`} className="btn btn-outline-secondary">
                        View Full Blog
                      </Link>
                      <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => navigate(`/edit-blog/${post._id}`)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeletePost(post._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-muted text-center">You haven't created any blogs yet.</p>
        )}
      </Container>
    </div>
  );
};

export default DashboardPage;
