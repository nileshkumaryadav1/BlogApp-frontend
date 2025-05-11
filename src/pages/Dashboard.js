import React, { useEffect, useState } from "react";
import { Button, Container, Card, Row, Col, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const navigate = useNavigate();

  const loggedInUserName = localStorage.getItem("name");
  const loggedInUserEmail = localStorage.getItem("email");
  const loggedInUser_id = localStorage.getItem("_id");

  useEffect(() => {
    axios
      .get(`https://blogapp-server-wa7m.onrender.com/api/blogs/?userEmail=${loggedInUserEmail}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load your posts. Please try again later.");
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
        setPosts(posts.filter((post) => post._id !== id));  // Update state after deletion
        toast.success("Post deleted successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Error deleting post.");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        await axios.delete(`https://blogapp-server-wa7m.onrender.com/api/users/${id}`);
        toast.success("Your account has been deleted successfully.");
        localStorage.clear();
        navigate("/");
      } catch (err) {
        console.error(err);
        toast.error("Error deleting account.");
      }
    }
  };

  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <i className="fa-solid fa-blog fa-bounce"></i>log
          </Navbar.Brand>
          <div className="ml-auto d-flex">
            <Link to={`/edit-user/${loggedInUser_id}`} className="btn btn-warning mx-2">
              Edit Profile
            </Link>
            <Link to={`/profile/${loggedInUserName}`} className="btn btn-primary mx-2">
              Profile
            </Link>
            <Button variant="danger" onClick={handleLogout}>
              Logout <i className="fa-solid fa-sign-out-alt"></i>
            </Button>
            <Button variant="light" className="text-danger mx-2" onClick={() => handleDeleteUser(loggedInUser_id)}>
              Delete Account <i className="fa-solid fa-trash-alt"></i>
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h1 className="text-center">Hello, {loggedInUserName}!</h1>
        <h5 className="text-center mb-4">Welcome to Your Blog Dashboard</h5>

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
                      <Card.Text>{post.description.substring(0, 100)}...</Card.Text>
                      <Link to={`/blog/${post._id}`} className="btn btn-outline-secondary mb-2">
                        View Full Blog
                      </Link>
                      <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => navigate(`/edit-blog/${post._id}`)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeletePost(post._id)}>
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

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2025 BlogApp. All Rights Reserved.</p>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default DashboardPage;
