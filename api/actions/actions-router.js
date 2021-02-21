const express = require("express");
const router = express.Router();
const model = require("./actions-model");
const { checkActionID, ccheckBodyInput } = require("../middleware/middleware");

// [GET] /api/actions
// [GET] /api/actions/:id
// [POST] /api/actions
// [POST] /api/actions/:id
// [DELETE] /api/actions/:id

module.exports = router;
