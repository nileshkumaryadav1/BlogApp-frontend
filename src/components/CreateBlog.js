
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import toast, { Toaster } from 'react-hot-toast';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !description) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Make API call to a dummy registration API
      const response = await axios.post('https://blogapp-server-wa7m.onrender.com/api/blogs', {
        title,
        description,
      });

      // Simulate a successful blog created response
      if (response.status === 200) {
        alert('Blog post created, Now you are redirecting to you Dashboard');
        // Redirect to the dasboard page after Submit
        navigate('/home');
      } else {
        console.log('not created / failed:', response.data);
        setError('blog not created . Please try again.');
      }
    } catch (err) {
      console.error('Create Blog error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const LoggedInUserName = localStorage.getItem('name');
  const loggedInUserEmail = localStorage.getItem('email');

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }}>
      <h3>Hi {LoggedInUserName} !</h3>
      <h5>Write a good Blog...</h5>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateBlog}>
        <div>
          <label>Title of your Today's Blog:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give a goood title.."
            required
          />
        </div>
        <div>
          <label>Write about you today's Blog:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Start writing here..."
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'created'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;