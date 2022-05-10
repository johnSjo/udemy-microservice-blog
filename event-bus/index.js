const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const ports = [4000, 4001, 4002, 4003];

const events = [];

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  ports.forEach((port) =>
    axios
      .post(`http://localhost:${port}/events`, event)
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
