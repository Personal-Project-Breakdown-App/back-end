//needed for the actions and project middleware
const actionsModel = require("../actions/actions-model");
const projectsModel = require("../projects/projects-model");

//LOGGER for new requests ---
function logger() {
  return (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`${time}: ${req.method} --- ${req.url}`);
    next();
  };
}

// ACTIONS ROUTER MIDDLEWARE ---
function checkActionID() {
  return (req, res, next) => {
    actionsModel
      .get(req.params.id)
      .then((res) => {
        if (res) {
          req.action = res;
          next();
        } else {
          res
            .status(404)
            .json({ message: "ID is not used. Choose another ID." });
        }
      })
      //moves to catch all 500 middleware coded on main server.js.
      .catch(() => next());
  };
}

function checkActionInput() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "Body needed" });
    }
    if (!res.body.description) {
      return res
        .status(400)
        .json({ message: "description variable needed in body" });
    }
    if (!req.body.name) {
      return res.status(400).json({ message: "notes variable needed in body" });
    }
    next();
  };
}

// PROJECTS-ROUTER MIDDLEWARE ---
function checkProjectID() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "Body needed" });
    }
    if (!res.body.project_id) {
      return res
        .status(400)
        .json({ message: "project_id variable needed in body" });
    }
    if (!req.body.description) {
      return res
        .status(400)
        .json({ message: "description variable needed in body" });
    }
    if (!req.body.notes) {
      return res.status(400).json({ message: "notes variable needed in body" });
    }
    next();
  };
}

function checkProjectInput() {
  return (req, res, next) => {
    projectsModel
      .get(req.params.id)
      .then((res) => {
        //is the project response valid? if it is move to the next middleware in the stack.
        res
          ? next()
          : res
              .status(404)
              .json({ message: "ID is not used. Choose another ID." });
      })
      //moves to catch all 500 middleware coded on main server.js.
      .catch(() => next());
  };
}

module.exports = {
  logger,
  checkActionID,
  checkProjectID,
  checkActionInput,
  checkProjectInput,
};
