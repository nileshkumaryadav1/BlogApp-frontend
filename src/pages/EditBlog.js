import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Fetch blog data when page loads
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://blogapp-server-wa7m.onrender.com/api/blogs/${id}`
        );
        // const res = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImage(res.data.image);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle blog update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://blogapp-server-wa7m.onrender.com/api/blogs/${id}`,
        {
          // await axios.put(`http://localhost:4000/api/blogs/${id}`, {
          title,
          description,
          image,
        }
      );
      alert("Blog updated successfully 🎉!");
      navigate("/profile"); // Redirect to dashboard page
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update blog.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">description</label>
          <textarea
            className="form-control"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Blog
        </button>
      </form>
      <footer className="bg-light text-black text-center py-3 position-fixed bottom-0 vw-100">
        <p className="mb-0 ">
          &copy; 2025 Blog<i class="fa-solid fa-blog"></i>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default EditBlog;
