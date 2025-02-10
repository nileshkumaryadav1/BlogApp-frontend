import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function FullBlog() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`https://blogapp-server-wa7m.onrender.com/api/blogs/${id}`)
      // .get(`http://localhost:4000/api/blogs/${id}`)
      .then((response) => setBlog(response.data))
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  if (!blog) return <p className="text-center">Loading...</p>;

  return (
    <>
      <div className="container mt-5">
        <div className="card shadow-lg p-4">
          <div className="justify-content-between w-100% bg-light rounded-top p-3">
            <h1 className="fw-bold text-center">{blog.title}</h1>
            <p className="text-muted text-center">By {blog.userName}</p>
          </div>
          <p className="bg-light rounded-bottom border-top p-3 description">
            {blog.description}
          </p>
          <p>
            Written by{" "}
            <a href={`/profile/${blog.userName}`}>
              <strong>{blog.userName}</strong>
            </a>
          </p>
        </div>
      </div>
      <footer className="bg-light text-black text-center py-3 vw-100">
        <p className="mb-0 ">
          &copy; 2025 Blog <i class="fa-solid fa-blog fa-beat"></i>. All rights
          reserved.
        </p>
      </footer>
    </>
  );
}
