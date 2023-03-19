import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PostsScreen from "./screens/PostsScreen";
import UserPostsScreen from "./screens/UserPostsScreen";
import PostDetailsScreen from "./screens/PostDetailsScreen";


function App() {
  return (
    <Router>
      <div>
        <Routes>

        <Route path="/posts/:id" element={<PostDetailsScreen />} />

          <Route path="/users/:id/posts" element={<UserPostsScreen />} />
          <Route path="/" element={<PostsScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
