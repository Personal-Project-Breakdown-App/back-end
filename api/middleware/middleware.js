//needed for the actions and project middleware
const actionsModel = require("../actions/actions-model");
const projectsModel = require("../projects/projects-model");

// ACTIONS ROUTER MIDDLEWARE ---
function checkActionID() {
  return (req, res, next) => {
    //console.log("checkingAction middleware activated")
    actionsModel
      .get(req.params.id)
      .then((action) => {
        if (action) {
          //console.log("Middleware working")
          req.action = action;
          next();
        } else {
          //console.log("Middleware 404")
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
      return res.status(400).json({ message: "Body needed" });
    } else if (
      !req.body.project_id ||
      !req.body.description ||
      !req.body.notes
    ) {
      return res.status(400).json({
        message:
          "project_id, description, and notes variables needed in body for posting",
      });
    }
    next();
  };
}

// PROJECTS-ROUTER MIDDLEWARE ---
function checkProjectInput() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "body required" });
    } else if (
      !req.body.description ||
      !req.body.name
    ) {
      return res
        .status(400)
        .json({
          message:
            "description and name needed for complete update",
        });
    }
    req.newProject = req.body
    next();
  };
}

function checkProjectID() {
  return (req, res, next) => {
    projectsModel
      .get(req.params.id)
      .then((project) => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({
            message: "Choose another ID",
          });
        }
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
