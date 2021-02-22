//needed for the actions and project middleware
const actionsModel = require("../actions/actions-model");
const projectsModel = require("../projects/projects-model");

// ACTIONS ROUTER MIDDLEWARE ---
function checkActionID() {
  return (req, res, next) => {
    actionsModel
      .get(req.params.id)
      .then((action) => {
        if (action) {
          req.action = action;
          next();
        } else {
          res
            .status(404)
            .json({ message: "ID is not used. Choose another ID." });
        }
      })
      //moves to catch all 500 middleware coded on main server.js.
      .catch((err) => next(err));
  };
}

function checkActionInput() {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({ message: "Body needed" });
    } else if (
      !req.body.project_id ||
      !req.body.description ||
      !req.body.notes ||
      !req.body.completed
    ) {
      res
        .status(400)
        .json({
          message:
            "project_id, description, notes, and completed variables needed in body",
        });
    } else {
      req.newAction = req.body;
      next();
    }
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
      .catch((err) => next(err));
  };
}

module.exports = {
  checkActionID,
  checkProjectID,
  checkActionInput,
  checkProjectInput,
};
