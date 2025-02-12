import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

import bootstrap from "bootstrap/dist/css/bootstrap.min.css";

const UserProfile = () => {
  const { name } = useParams(); // Get username from URL
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `https://blogapp-server-wa7m.onrender.com/api/users/?name=${name}`
          // `http://localhost:4000/api/users/?name=${name}`
        );
        const userDetail = res.data[0];
        setUsers(userDetail);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUserProfile();
  }, [name]);

  useEffect(() => {
    const fetchUserBlog = async () => {
      try {
        const blogOfUser = await axios.get(
          `https://blogapp-server-wa7m.onrender.com/api/blogs/?userName=${name}`
          // `http://localhost:4000/api/blogs/?userName=${name}`
        );
        const userBlogs = blogOfUser.data;
        setBlogs(userBlogs);
      } catch (err) {
        console.error("Error fetching user blog:", err);
      }
    };

    fetchUserBlog();
  }, [name]);

  if (!name) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      {/* <p className="text-warning">*This section is under development.</p> */}

      <div class="container mt-4">
        <div class="card mx-auto">
          <h2 className="text-center pt-3">
            <i class="fa-solid fa-user"></i>
          </h2>
          <div class="card-body text-center">
            <h4 class="card-title">{users.name}</h4>
            <p class="card-text">
              {/* Bachelor of Technology | Katihar Engineering College   */}
              {users.study}
            </p>
            <Link to={"/profile"} className="btn btn-primary mx-2">
              Dashboard <i class="fa-regular fa-id-badge"></i>
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-around align-item-center">
          <div class="mt-2 text-center">
            <h3>About Me</h3>
            <p>
              {/* Hi, I'm {users.name}, <br></br>  */}
              {users.bio}
            </p>
          </div>

          <div class="mt-2 text-center">
            <h3>Social Links</h3>
            <div className="">
              <h5 className="text-center mx-1">
                <a
                 className="text-decoration-none"
                 href={users.instagram} 
                 target="_blank">
                <i class="fa-brands fa-instagram"></i>
                 Instagram
                </a>
              </h5>
              <h5 className="text-center mx-1">
                <a 
                className="text-decoration-none"
                href={users.linkedin}
                 target="_blank">
                  <i class="fa-brands fa-linkedin"></i>
                  LinkedIn
                </a>
              </h5>
            </div>
          </div>

          <div class="mt-2 text-center">
            <h3>Contact</h3>
            <p>
              {/* Email: {users.email} */}
              Email: --@gmail.com
              <br></br>
              {/* Phone: {users.phone} */}
              Phone: +91 ----
            </p>
          </div>
        </div>

        <div className="container mb-3 mt-2 pt-1 col-md-12 border-top">
          <h4 className="card-title text-black mb-2">Latest Blogs by {name}</h4>

          <div className="row mb-3">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div key={blog._id} className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title description">
                        {blog.title.substring(0, 40)}...
                      </h5>
                      <p className="card-text description">
                        {blog.description.substring(0, 45)}...
                      </p>
                      <div>
                        <button className="btn btn-light mb-1">
                          <i class="fa-solid fa-pen-nib"></i> Author :{" "}
                          {blog.userName}
                        </button>
                        {/* <p > Time : {getTimeAgo(post.timestamp)}</p> */}
                        <Link
                          to={`/blog/${blog._id}`}
                          className="btn btn-outline-secondary w-100"
                        >
                          Read More{" "}
                          <i class="fa-solid fa-book-open fa-flip"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <p className="fst-italic">
                  {users.name} have not created any Blog yet.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
