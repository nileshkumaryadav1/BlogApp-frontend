import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import toast, { Toaster } from 'react-hot-toast';

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

import BASE_URL from "../utils/Api";
import BLOG_URL from "../utils/Api";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !description) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Make API call to a dummy registration API
      // const response = await axios.post('https://blogapp-server-wa7m.onrender.com/api/blogs', {
      //   title,
      //   description,
      // });

      const LoggedInUserName = localStorage.getItem('name');
      const loggedInUserEmail = localStorage.getItem('email');

      console.log(loggedInUserEmail, LoggedInUserName);

      const response = await axios.post("https://blogapp-server-wa7m.onrender.com/api/blogs", {
        title,
        description,
        loggedInUserEmail,
        LoggedInUserName
      });

      // Simulate a successful blog created response
      if (response.status === 200) {
        alert( 'Blog created successful! 🎉');
        // Redirect to the dasboard page after Submit
        navigate("/home");
      } else {
        console.log("not created / failed:", response.data);
        setError("blog not created . Please try again.");
      }
    } catch (err) {
      console.error("Create Blog error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const LoggedInUserName = localStorage.getItem("name");
  const loggedInUserEmail = localStorage.getItem("email");

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-gradient"
      style={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        padding: "20px",
      }}
    >
      <div
        className="card p-4 shadow-lg rounded d-flex justify-content-center align-items-center"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          width: "100%",
          maxWidth: "850px",
          height: "90%",
          minheight: "1000px",
        }}
      >
        <div>
          <h3>Hi {LoggedInUserName} !</h3>
          <h5 className="mb-2 d-flex justify-content-center align-items-center">
            Create a Blog...
          </h5>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleCreateBlog} className="w-100">
          <div>
            <label>Title of the Blog...</label>
            <input
              type="text"
              value={title}
              className="form-control form-control border-primary mb-4"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of your Today's Blog"
              required
            />
          </div>
          <div>
            <label>Write about you today's Blog...</label>
            <textarea
              class="form-control form-control form-control-lg border-primary mb-4 w-100"
              rows="3"
              type="text"
              value={description}
              className="form-control form-control-lg border-primary mb-4 w-100"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Start writing here..."
              required
            ></textarea>
          </div>

          <button
            className="btn btn-primary w-100 btn-lg fw-bold shadow-sm mb-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
