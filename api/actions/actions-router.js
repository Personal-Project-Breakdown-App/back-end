const express = require("express");
const router = express.Router();
const model = require("./actions-model");
//middleware for validating the action ID and input form for POST and PUT
//500 error codes middleware on main server.js - next()
const { checkActionID, checkActionInput } = require("../middleware/middleware");

// Insomnia Checking either ✅ or ⛔ | [method passes] [method error passes]
// [GET] /api/actions ✅[n/a]
router.get("/api/actions", async (req, res) => {
  res.send(await model.get());
});

// [GET] /api/actions/:id ✅✅
router.get("/api/actions/:id", checkActionID(), (req, res) => {
  res.json(req.action);
});

// [POST] /api/actions ✅✅
router.post("/api/actions", checkActionInput(), async (req, res, next) => {
  try {
    await model.insert(req.body);
    res.status(200).json(req.body);
  } catch {
    next();
  }
});

// [PUT] /api/actions/:id ✅✅
router.put(
  "/api/actions/:id",
  checkActionInput(),
  checkActionID(),
  (req, res, next) => {
    model
      .update(req.params.id, req.body)
      .then((action) => {
        res.status(200).json(action.body);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// [DELETE] /api/actions/:id ✅✅
router.delete("/api/actions/:id", checkActionID(), (req, res, next) => {
  model
    .remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "This action has been deleted",
        });
      } else {
        res.status(404).json({ message: "This action could not be deleted." });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
