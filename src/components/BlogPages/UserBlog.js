import { useState, useEffect } from 'react';
import axios from 'axios';

const UserBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const loggedInUserEmail = localStorage.getItem("userEmail"); // Get email from local storage or context

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const response = await axios.get(`https://blogapp-server-wa7m.onrender.com/api/blogs/user-blogs?email=${loggedInUserEmail}`);
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching user blogs", error);
            }
        };

        if (loggedInUserEmail) {
            fetchUserBlogs();
        }
    }, [loggedInUserEmail]);

    return (
        <div>
            <h2>My Blogs</h2>
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <div key={blog.loggedInUserEmail} className="card my-3 p-3">
                        <h3>{blog.title}</h3>
                        <p>{blog.createdAt}</p>
                        <p>{blog.description}</p>
                    </div>
                ))
            ) : (
                <p>No blogs found.</p>
            )}
        </div>
    );
};

export default UserBlog;
