import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const LoggedInUserName = localStorage.getItem('name');
  const loggedInUserEmail = localStorage.getItem('email');


  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('https://blogapp-server-wa7m.onrender.com/api/blogs')  // Replace with your actual API URL
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="bg-light">
      <Container className="py-5">
        <div className="text-center mb-4">
          <h1>Welcome to Your Blog Dashboard</h1>
          <p>Hello {LoggedInUserName} ! Welcome back to your dashboard.</p>
          <Button href="/create/blog" variant="success">Create New Blog</Button>
        </div>

        <Row>
          {blogs.map((blog) => (
            <Col key={blog.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>
                  <Card.Text>{blog.description}</Card.Text>
                  <Button variant="primary" href={`/blog/${blog.id}`}>Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
