
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import './PostDetails.css';



const API_URL = 'http://jsonplaceholder.typicode.com';

const PostDetailsScreen = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const fetchPostDetails = async () => {
      // Fetch post details
      const postResponse = await axios.get(`${API_URL}/posts/${id}`);
      setPost(postResponse?.data ?? {});

      // Fetch comments for post
      const commentsResponse = await axios.get(`${API_URL}/posts/${id}/comments`);
      setComments(commentsResponse?.data ?? []);

      // Fetch author details for post
      const userId = postResponse?.data?.userId;
      const authorResponse = await axios.get(`${API_URL}/users/${userId}`);
      setAuthor(authorResponse?.data ?? {});
    };

    fetchPostDetails();
  }, [id]);

const handleCommentSubmit = async (comment) => {
    const response = await axios.post(`${API_URL}/comments`, comment);
    setComments([...comments, response?.data ?? {}]);
  };




  return (
    <div className="container">
      <h1 className="post-title">{post?.title}</h1>
      <p className="post-body">{post?.body}</p>

      <div className="author">
        <h2>Author</h2>
        <p className="author-info">{author?.name}</p>
        <p className="author-info">{author?.phone}</p>
        <p className="author-info">{author?.company?.name}</p>
      </div>

      <div className="comments">
        <h2>Comments</h2>
        <ul>
          {comments?.map((comment) => (
            <li key={comment.id} className="comment">
              <p className="comment-name">{comment?.name}</p>
              <p className="comment-body">{comment?.body}</p>
            </li>
          ))}
        </ul>

        <div className="comment-form">
          <CommentForm onCommentSubmit={handleCommentSubmit} />
        </div>
        </div>
    </div>
  );
};

export default PostDetailsScreen;
