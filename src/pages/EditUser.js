
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

const id = localStorage.getItem("_id");

const EditUser = () => {
  const id = localStorage.getItem("_id");

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [study, setStudy] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");

  // Fetch user data when page loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`https://blogapp-server-wa7m.onrender.com/api/users/${id}`);
        // const res = await axios.get(`http://localhost:4000/api/users/${id}`);
        setName(res.data.name);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setStudy(res.data.study);
        setBio(res.data.bio);
        setInstagram(res.data.instagram);
        setTwitter(res.data.twitter);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  // Handle blog update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://blogapp-server-wa7m.onrender.com/api/users/${id}`, {
      // await axios.patch(`http://localhost:4000/api/users/${id}`, {
        name,
        email,
        password,
        study,
        bio,
        instagram,
        twitter,
      });
      alert("User updated successfully 🎉!");

      localStorage.setItem("name", name); // Save name to local storage
      localStorage.setItem("email", email); // Save email to local storage

      navigate("/profile"); // Redirect to dashboard page
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Failed to update User.");
    }
  };

  return (
    <>
      <div className="container card p-2 mt-4 shadow p-3 mb-5 bg-body rounded ">
        <h3 className="text-center" >Edit Profile Details</h3>
        <form onSubmit={handleUpdate} className="container w-75">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              rows="2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              rows="2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Branch / Stream | College name</label>
            <input
              className="form-control"
              rows="2"
              value={study}
              onChange={(e) => setStudy(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Bio/ Description about yourself</label>
            <input
              className="form-control"
              rows="2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Instagram Profile link</label>
            <input
              className="form-control"
              rows="2"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Twitter Profile link</label>
            <input
              className="form-control"
              rows="2"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Details
          </button>
        </form>
      </div>
      <footer className="bg-light text-black text-center p-3 mt-5">
        <p className="mb-0 ">
          &copy; 2025 Blog<i class="fa-solid fa-blog"></i>. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default EditUser;
