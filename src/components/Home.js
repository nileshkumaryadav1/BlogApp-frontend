// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

// const HomePage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const LoggedInUserName = localStorage.getItem('name');
//   const loggedInUserEmail = localStorage.getItem('email');

//   useEffect(() => {
//     // Fetch data from the API when the component mounts
//     axios.get('https://blogapp-server-wa7m.onrender.com/api/blogs')  // Replace with your actual API URL
//       .then((response) => {
//         setBlogs(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (

//     <div className="bg-light">
//       <Container className="py-5">
//         <div className="text-center mb-4">
//           <h1>Hello {LoggedInUserName} !</h1>
//           <h5 className='mb-3' >Welcome to Your Blog Dashboard</h5>
//           <Button href="/create/blog" variant="success">Create New Blog</Button>
//         </div>

//         <Row>
//           {blogs.map((blog) => (
//             <Col key={blog.id} md={4} className="mb-4">
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{blog.title}</Card.Title>
//                   <Card.Text>{blog.description}</Card.Text>
//                   <Button variant="primary" href={`/blogs/${blog.id}`}>Read More</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GlobalPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/blogs")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const LoggedInUserName = localStorage.getItem("name");
  const loggedInUserEmail = localStorage.getItem("email");

  return (
    <div>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
         <div className="container">
           <a className="navbar-brand fw-bold" href="#">My Blog</a>
           <Link to='/home' className="navbar-brand fw" >Hi {LoggedInUserName} !</Link>
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
             <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="navbarNav">
             <ul className="navbar-nav ms-auto">
               <li className="nav-item">
               <Link to="/register" className="nav-link navbar-brand fw-bold" >Register</Link>
               </li>
               <li className="nav-item">
               <Link to="/login" className="nav-link navbar-brand fw-bold" >Login</Link>
               </li>
             </ul>
           </div>
         </div>
       </nav> */}

      {/* <header className="bg-gradient text-white text-center py-5" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
         <div className=" navbar-brand fw-bold">
           <h1 className="display-4 fw-bold navbar-brand fw-bold text-black">Welcome to The Place of Great Blogs</h1>
          <p className="card-title text-black">Discover amazing content and insights</p>
        </div>
      </header> */}


<nav className="navbar navbar-expand-lg navbar-dark ">
         <div className="container">
           <a className="navbar-brand fw-bold text-black " href="https://blogwriting.vercel.app"><h2><i class="fa-solid fa-house"></i></h2></a>
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
             <span className="navbar-toggler-icon"></span>
           </button>
           <button className="btn btn-secondary" >Logout</button>
           {/* <div className="collapse navbar-collapse" id="navbarNav">
             <ul className="navbar-nav ms-auto">
               <li className="nav-item">
               <Link to="/register" className="nav-link navbar-brand fw-bold" >Register</Link>
               </li>
               <li className="nav-item">
               <Link to="/login" className="nav-link navbar-brand fw-bold" >Login</Link>
               </li>
             </ul>
           </div> */}
         </div>
       </nav>

      <div className="text-center mb-4">
        <h1>Hello {LoggedInUserName} !</h1>
        <h5 className="mb-3">Welcome to Your Blog Dashboard</h5>
        <Button href="/create/blog" variant="success" className="mb-4">
          Create New Blog
        </Button>
      </div>

      <div className="container mb-3">
        <div className="row mb-3">
          <h2 className="mb-4" >Your created Blogs are...</h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">
                      {post.description.substring(0, 100)}...
                    </p>
                    <div className="d-flex d-flex justify-content-between align-items-center">
                      <button className="btn btn-light">
                        {" "}
                        Author : {post.userName}
                      </button>
                      <Link
                        to={`/blog/${post._id}`}
                        className="btn btn-primary"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No blog posts available.</p>
          )}
        </div>
      </div>
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0 ">&copy; 2025 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
