import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !description || !image) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const loggedInUserName = localStorage.getItem("name");
      const loggedInUserEmail = localStorage.getItem("email");

      const response = await axios.post(
        "https://blogapp-server-wa7m.onrender.com/api/blogs",
        {
          title,
          description,
          image,
          userName: loggedInUserName,
          userEmail: loggedInUserEmail,
        }
      );

      // when successful blog created response
      if (response.status === 201) {
        alert("Blog created successful! 🎉");
        // forward to profile page after sumbit
        navigate("/profile");
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

  const loggedInUserName = localStorage.getItem("name");
  const loggedInUserEmail = localStorage.getItem("email");

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center bg-gradient vh-7"
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
            <h3>Hi {loggedInUserName} !</h3>
            <h5 className="mb-2 d-flex justify-content-center align-items-center">
              Create a Blog...<i class="fa-solid fa-pen fa-shake"></i>
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
                rows="3"
                type="text"
                value={description}
                className="form-control form-control border-primary mb-4"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Start writing here..."
                required
              ></textarea>
            </div>
            <div>
              <label>Image Url of your Blog...</label>
              <input
                type="text"
                value={image}
                className="form-control form-control border-primary mb-4"
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image Url of your Blog"
                required
              />
            </div>

            <button
              className="btn btn-primary p-2 fs-5"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
      <footer className="bg-light text-black text-center py-3 position-fixed bottom-0 vw-100">
        <p className="mb-0 ">
          &copy; 2025 Blog<i class="fa-solid fa-blog"></i>. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default CreateBlog;
