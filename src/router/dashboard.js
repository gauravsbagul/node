const express = require('express')
const { dashboard } = require('../controllers/dashboard')
const dashboardRouter = express.Router()

dashboardRouter.post('/saveData', dashboard)

module.exports = dashboardRouter
