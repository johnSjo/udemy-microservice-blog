import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const { data } = await axios
      .get('http://localhost:4002/posts')
      .catch((error) => console.error(error));
    console.log(data);

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(({ id, title, comments }) => (
    <div
      key={id}
      className="card"
      style={{ width: '30%', marginBotton: '20px' }}
    >
      <div className="card-body">
        <h3>{title}</h3>
        <CommentList comments={comments} />
        <CommentCreate postId={id} />
      </div>
    </div>
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}
