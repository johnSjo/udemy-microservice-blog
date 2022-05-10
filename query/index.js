const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

function handleEvent(type, data) {
  switch (type) {
    case 'PostCreated': {
      const { id, title } = data;

      posts[id] = { id, title, comments: [] };

      break;
    }
    case 'CommentCreated': {
      const { postId, ...rest } = data;
      const post = posts[postId];

      post.comments.push({ ...rest });

      break;
    }
    case 'CommentUpdated':
      const { postId, id, status, content } = data;
      const post = posts[postId];
      console.log(posts, 'CommentUpdated');
      console.log('DATA', data);
      const comment = post.comments.find((comment) => comment.id === id);

      comment.status = status;
      comment.content = content;

      break;
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  console.log(posts);

  res.send({});
});

// app.post('/events', (req, res) => {
//   console.log('Recived event', req.body.type);

//   res.send({});
// });

app.listen(4002, async () => {
  console.log('Query.API is listening to port 4002');

  const res = await axios
    .get(`http://localhost:4005/events`)
    .catch((error) => console.error(error));

  res.data.forEach(({ type, data }) => {
    console.log('Processing event: ', type);

    handleEvent(type, data);
  });
});
