const express = require('express');
const bodyParser = require('body-parser');
// const { randomBytes } = require('crypto');
const axios = require('axios');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());
// app.use(cors());

// const posts = {};

// app.get('/posts', (req, res) => {
//   res.send(posts);
// });
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case 'CommentCreated':
      const status = data.content.includes('boo') ? 'rejected' : 'approved';

      await axios
        .post(`http://event-bus-srv:4005/events`, {
          type: 'CommentModerated',
          data: { ...data, status },
        })
        .catch((error) => console.error(error));

      break;
  }

  //   console.log(posts);

  res.send({});
});

app.listen(4003, () => {
  console.log('Moderation.API is listening to port 4003');
});
