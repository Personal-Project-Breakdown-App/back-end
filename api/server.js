const express = require("express");
const server = express();
const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use(express.json());
server.use(actionsRouter);
server.use(projectsRouter);
server.use((err, req, res) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong, server error. Please try again.",
  });
});

module.exports = server;
