import React, { useState } from "react";
import axios from "axios";
import "./CommentForm.css";

function CommentForm({ postId, onCommentSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      postId,
      name,
      email,
      body,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/comments", data)
      .then((response) => {
        onCommentSubmit(response.data);
        setName("");
        setEmail("");
        setBody("");
    console.log(data)  
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CommentForm;
