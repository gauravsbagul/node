import express, { Application, Request, Response, NextFunction } from 'express'
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const response = require('./utils/response')
const auth = require('./router/auth')
const dashboardRouter = require('./router/dashboard')

const app: Application = express()
const port = process.env.PORT || 5000

app.use(cors())
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use('/', express.static(path.join())) //used in-case of single app, angular is folder which contains UI build

app.use((_, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
  next()
})

app.use('/auth', auth)
app.use('/dashboard', dashboardRouter)

//code for single app
app.use((_, res: Response) => {
  return response(res, 200, true, 'Hello world!', {})
})

app.listen(port, () => {
  console.log(`Log: ~> app is up and running on ~> port-${port} on ENVIRONMENT ~> ${process.env.ENVIRONMENT}`)
})

module.exports = app
