import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar-footer/Navbar";

export default function GlobalPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/blogs")
      // .get("http://localhost:4000/api/blogs")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);


  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://blogapp-server-wa7m.onrender.com/api/users")
      // .get("http://localhost:4000/api/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const loggedInUserName = localStorage.getItem("name");
  const loggedInUserEmail = localStorage.getItem("email");

  //  const getTimeAgo = (timestamp) => {

  //   const secondsAgo = Math.floor((new Date() - new Date(timestamp)) / 1000);

  //   if (secondsAgo < 60) return "Just now";
  //   if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
  //   if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
  //   return `${Math.floor(secondsAgo / 86400)} days ago`;
  //  };

  return (
    <div className="bg-light">
      <Navbar />

      <header
        className="bg-gradient text-white text-center header-global"
        style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
      >
        <div className=" navbar-brand fw-bold">
          <h3 className="card-title mb-1 animate">
            Hi {loggedInUserName} !
          </h3>
          <h1 className="display-4 fw-bold navbar-brand fw-bold text-black">
            Welcome to The Place of Great Blogs
          </h1>
          <h5 className="card-title text-black">
            Discover amazing content and insights
          </h5>
        </div>
      </header>

      <div className="d-flex col-md-12">
        <div className="container mb-3 mx-2 col-md-3">
          <h4 className="card-title text-black">Check out top creators-</h4>
          <h6 className="card-title text-black mb-3">
            follow them for their Blogs notification.
          </h6>
          <div className="row mb-3">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className="col-md-12 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title text-center">{user.name}</h5>
                      {/* <p className="card-text">
                        {user.bio.substring(0, 100)}...
                      </p> */}
                      <div>
                        <h5 className="text-center" ><i class="fa-brands fa-instagram"></i> : <a href="https://www.instagram.com/{user.instagram}/" >@{user.instagram}</a></h5>
                        {/* <p > Time : {getTimeAgo(user.timestamp)}</p> */}
                        <Link
                          to={`/blog/${user._id}`}
                          className="btn btn-outline-primary w-100"
                        >
                          View profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* add loading animation */}
                <div></div>
                <p className="text-center"></p>
              </>
            )}
          </div>

          <p className="text-black mt-3 my-3 mx-3">
            You can also write your Blogs by
            <Link to="/register" className="btn btn-primary mx-2 mb-1">
              Register
            </Link>
            or
            <Link to="/login" className="btn btn-primary mx-2">
              Login
            </Link>
          </p>
          <p className="card-title text-black mb-3 mx-3 my-3" >& also excess some extra features.</p>

        </div>

        <div className="container mb-3 col-md-8">
          <h4 className="card-title text-black mb-3">
            These are some latest Blogs by our Users.
          </h4>

          <div className="row mb-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">
                        {post.description.substring(0, 100)}...
                      </p>
                      <div>
                        <p><i class="fa-solid fa-pen-nib"></i> Author : {post.userName}</p>
                        {/* <p > Time : {getTimeAgo(post.timestamp)}</p> */}
                        <Link
                          to={`/blog/${post._id}`}
                          className="btn btn-outline-secondary w-100"
                        >
                          Read More <i class="fa-solid fa-book-open"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* add loading animation */}
                <div></div>
                <p className="text-center">Finding Blogs...</p>
              </>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0 ">&copy; 2025 Blog<i class="fa-solid fa-blog"></i>. All rights reserved.</p>
      </footer>
    </div>
  );
}
