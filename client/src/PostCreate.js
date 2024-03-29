import React, { useState } from 'react';
import axios from 'axios';

export default function PostCreate() {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post('http://post.com/posts/create', { title })
      .catch((error) => console.error(error));

    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
