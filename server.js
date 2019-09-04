const express = require("express");
const helmet = require("helmet");

// const db = require("./data/db-config.js");



const postsRouter = require('./data/postsRouter.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

module.exports = server;

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's working!!" });
});

server.get('/data/post', (req, res) => {

})

module.exports = server;