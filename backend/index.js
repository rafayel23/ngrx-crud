const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fileSystem = require('fs');
const shortId = require('shortid');

const server = express();
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(cors());

const DB_PATH = path.join(__dirname, 'db.json');
const PORT = process.env.PORT || 3000;

function readDB() {
  return JSON.parse(fileSystem.readFileSync(DB_PATH));
}

function writeDB(data) {
  fileSystem.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

server.route('/users')
  .get((req, res) => {
    const { users } = readDB();
    res.status(200).send(users);
  })
  .post((req, res) => {
    const data = readDB();
    req.body.id = shortId.generate();
    data.users.push(req.body);
    writeDB(data);
    res.status(201).send(req.body);
  });

server.route('/users/:id')
  .put((req, res) => {
    const { id } = req.params;
    const data = readDB();
    const targetUser = data.users.find(user => user.id == id);
    Object.assign(targetUser, req.body);
    writeDB(data);
    res.status(201).send(targetUser);
  })
  .delete((req, res) => {
    const { id } = req.params
    const data = readDB();
    const targetUserIndex = data.users.findIndex(user => user.id == id);
    data.users.splice(targetUserIndex, 1);
    writeDB(data);
    res.status(204).send();
  });

server.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});
