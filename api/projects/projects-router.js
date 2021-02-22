const express = require("express");
const router = express.Router();
const model = require("./projects-model");
const {
  checkProjectID,
  checkProjectInput,
} = require("../middleware/middleware");
const actions = require("../actions/actions-model")

// [GET] /api/projects
router.get("/api/projects", async (req, res) => {
  res.send(await model.get());
});

// [GET] /api/projects/:id
router.get("/api/projects/:id", checkProjectID(), async (req, res) => {
  res.send(await model.get(req.project.id));
});

// [POST] /api/projects
router.post("/api/projects", checkProjectInput(), async (req, res, next) => {
  try {
    await model.inset(req.newProject);
    res.send(req.newProject);
  } catch {
    next();
  }
});

// [PUT] /api/projects/:id
router.put(
  "/api/projects/:id",
  checkProjectID(),
  checkProjectInput(),
  async (req, res, next) => {
    try {
      await model.update(req.project.id, req.changes);
      res.send(req.changes);
    } catch {
      next();
    }
  }
);

// [DELETE] /api/projects/:id
router.delete("/api/projects/:id", checkProjectID(), async (req, res, next) => {
    try {
        await model.remove(req.params.id)
        res.status(200).json({message: `Deleted Project ID ${req.params.id}`})
    } catch {
        next()
    }
})

// [GET] /api/projects/:id/actions [array of actions (or empty array) as the body of the response]
router.get("api/projects/:id/actions", checkProjectID(), async (req, res, next) => {
    try {
        await model.getProjectActions(req.params.id)

        res.status(200).json(req.params.id)
    } catch {
        next()
    }
})

module.exports = router;
