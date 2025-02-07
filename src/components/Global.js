// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
// import { Axios } from "axios";

// export default function GlobalPage() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     // Fetch blog posts from the database (replace with actual API endpoint)
//     fetch("https://blogapp-server-wa7m.onrender.com/api/blogs")
//       .then(response => response.json())
//       .then(data => setPosts(data))
//       .catch(error => console.error("Error fetching posts:", error));
//   }, []);

//   const LoggedInUserName = localStorage.getItem('name');
//   const loggedInUserEmail = localStorage.getItem('email');

//   return (

//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//         <div className="container">
//           <a className="navbar-brand fw-bold" href="#">My Blog</a>
//           <Link to='/home' className="navbar-brand fw" >Hi {LoggedInUserName} !</Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//               <Link to="/register" className="nav-link navbar-brand fw-bold" >Register</Link>
//               </li>
//               <li className="nav-item">
//               <Link to="/login" className="nav-link navbar-brand fw-bold" >Login</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <header className="bg-gradient text-white text-center py-5" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
//         <div className=" navbar-brand fw-bold">
//           <h1 className="display-4 fw-bold navbar-brand fw-bold text-black">Welcome to The Place of Great Blogs</h1>
//           <p className="card-title text-black">Discover amazing content and insights</p>
//         </div>
//       </header>

//       <div className="container mb-3">
//         <div className="row mb-3">
//           {posts.length > 0 ? (
//             posts.map((post, index) => (
//               <div key={index} className="col-md-4 mb-4">
//                 <div className="card shadow-sm">
//                   <div className="card-body">
//                     <h5 className="card-title">{post.title}</h5>
//                     <p className="card-text">{post.description}</p>
//                     <a href='/blogs/${blogs._id}' className="btn btn-primary">Read More</a>
//                     {/* <Link to={`/blogs/${blog._id}`} className="btn btn-primary">Read More</Link>  */}
//                   </div>
//                 </div>
//               </div>
              
//             ))
//           ) : (
//             <p className="text-center">No blog posts available.</p>
//           )}
//         </div>
//       </div>

//       <footer className="bg-dark text-white text-center py-3">
//         <p className="mb-0 ">&copy; 2025 My Blog. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar/Navbar";

export default function GlobalPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://blogapp-server-wa7m.onrender.com/api/blogs")
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const LoggedInUserName = localStorage.getItem('name');
   const loggedInUserEmail = localStorage.getItem('email');


  //  const getTimeAgo = (timestamp) => {
  //   const secondsAgo = Math.floor((new Date() - new Date(timestamp)) / 1000);

  //   if (secondsAgo < 60) return "Just now";
  //   if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
  //   if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
  //   return `${Math.floor(secondsAgo / 86400)} days ago`;
  //  };


  return (
    <div>

        <Navbar />
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

       <header className="bg-gradient text-white text-center py-5" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
         <div className=" navbar-brand fw-bold">
           <h1 className="display-4 fw-bold navbar-brand fw-bold text-black">Welcome to The Place of Great Blogs</h1>
          <p className="card-title text-black">Discover amazing content and insights</p>
        </div>
      </header>


    <div className="container mb-3">
      <div className="row mb-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description.substring(0, 100)}...</p>
                  <div>
                  <p> Author : {post.userName}</p>
                  {/* <p > Time : {getTimeAgo(post.timestamp)}</p> */}
                  <Link to={`/blog/${post._id}`} className="btn btn-outline-secondary w-100">Read More</Link>
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
