const express = require("express");
const router = express.Router();
const model = require("./projects-model");
const {
  checkProjectID,
  checkProjectInput,
} = require("../middleware/middleware");

// [GET] /api/projects ✅✅
router.get("/api/projects", async (req, res, next) => {
  try {
    const projects = await model.get();
    res.status(200).json(projects);
  } catch {
    next();
  }
});

// [GET] /api/projects/:id ✅✅
router.get("/api/projects/:id", checkProjectID(), (req, res) => {
  res.json(req.project);
});

// [POST] /api/projects ✅✅
router.post("/api/projects", checkProjectInput(), (req, res, next) => {
  model
    .insert(req.newProject)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

// [PUT] /api/projects/:id ✅✅
router.put(
  "/api/projects/:id",
  checkProjectID(),
  checkProjectInput(),
  async (req, res, next) => {
    try {
      const project = await model.update(req.params.id, req.body);
      res.status(200).json(project);
    } catch {
      next();
    }
  }
);

// [DELETE] /api/projects/:id ✅✅
router.delete("/api/projects/:id", checkProjectID(), async (req, res, next) => {
  try {
    await model.remove(req.params.id);
    res.status(200).json({ message: `Deleted Project ID ${req.params.id}` });
  } catch {
    next();
  }
});

// [GET] /api/projects/:id/actions [array of actions (or empty array) as the body of the response] ✅✅
router.get(
  "/api/projects/:id/actions",
  checkProjectID(),
  async (req, res, next) => {
    try {
      const actions = await model.getProjectActions(req.params.id);
      res.status(200).json(actions);
    } catch {
      next();
    }
  }
);

module.exports = router;
