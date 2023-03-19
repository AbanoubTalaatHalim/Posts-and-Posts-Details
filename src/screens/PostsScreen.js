import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostListScreen.css';

const API_URL = 'http://jsonplaceholder.typicode.com';

const PostListScreen = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`${API_URL}/posts?_page=${currentPage}&_limit=20`);
      setPosts(response.data);
    };
    fetchPosts();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="post-list-container">
      <h1 className="post-list-header">All Posts</h1>
      <div className="post-list-search">
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" value={searchTerm} onChange={handleSearch} />
      </div>
      <ul className="post-list">
        {filteredPosts.map((post) => (
          <li key={post.id} className="post-list-item">
            <div className="post-list-item-title">{post.title}</div>
            <div className="post-list-item-body">{post.body}</div>
          </li>
        ))}
      </ul>
      <div className="post-list-pagination">
        <button className="post-list-pagination-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span className="post-list-pagination-page">{currentPage}</span>
        <button className="post-list-pagination-btn" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PostListScreen;
