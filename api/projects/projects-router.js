const express = require('express')
const router = express.Router()
const model = require('./projects-model')
const { checkProjectID, checkBodyInput } = require('../middleware/middleware')

// [GET] /api/projects
// [GET] /api/projects/:id
// [POST] /api/projects
// [PUT] /api/projects/:id
// [DELETE] /api/projects/:id
// [GET] /api/projects/:id/actions [array of actions (or empty array) as the body of the response]

module.exports = router