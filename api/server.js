const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use(express.json());
server.use(projectsRouter);
server.use(actionsRouter);
// eslint-disable-next-line no-unused-vars
server.use((err, req, res) => {
  //console.log(err);
  req.status(500).json({
    message: "Something went wrong, server error. Please try again.",
  });
});

server.get("/", (req, res) => {
  res.send(`<h1>Sprint Challenge 4.1</h1>`);
});

module.exports = server;
