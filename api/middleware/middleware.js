actionsModel = require("../actions/actions-model");
projectsModel = require("../projects/projects-model");

function logger() {
  return (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`${time}: ${req.method} --- ${req.url}`);
    next();
  };
}

function checkActionID() {
  return (req, res, next) => {};
}

function checkProjectID() {
  return (req, res, next) => {};
}

function checkBodyInput() {
  return (req, res, next) => {};
}

module.exports = {
  logger,
  checkActionID,
  checkProjectID,
  checkBodyInput,
};
