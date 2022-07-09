import express from 'express'
import { dashboard } from '../controllers/dashboard'
const dashboardRouter = express.Router()

dashboardRouter.post('/saveData', dashboard)

module.exports = dashboardRouter
