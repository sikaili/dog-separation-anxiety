const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use("/public", express.static('public'));
app.use("/src", express.static('src'));
app.use("/assets", express.static('assets'));
app.use("/libraries", express.static('libraries'));
app.use(express.json({
  limit: '1mb'
}));

const database = new Datastore('database.db');
// database.insert({
//   name: 'sikai',
//   status: 'cool'
// })
database.loadDatabase();


app.post('/api', (request, response) => {
  const data = (request.body);
  const timeStamp = Date.now();
  data.timeStamp = timeStamp;
  database.insert(data);
  response.json({
    status: 'success',
    timeStamp: request.body.timeStamp,
    latituede: request.body.lat,
    longitude: request.body.long
  })
})