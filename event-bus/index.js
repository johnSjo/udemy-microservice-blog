const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const services = [
  'posts-clusterip-srv:4000',
  'comments-srv:4001',
  'query-srv:4002',
  'moderation-srv:4003',
];

const events = [];

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  services.forEach((service) =>
    axios
      .post(`http://${service}/events`, event)
      .catch((error) => console.error(error))
  );

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('event-bus is listening to port 4005');
});
