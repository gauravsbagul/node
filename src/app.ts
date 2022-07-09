/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
require('dotenv').config()
import { response } from './utils/response'
import auth from './router/auth'
import dashboardRouter from './router/dashboard'
import { logger } from './logger'

const app: Application = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use('/', express.static(path.join())) //used in-case of single app, angular is folder which contains UI build

app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
  next()
})

app.use('/auth', auth)
app.use('/dashboard', dashboardRouter)

app.use('/', (req: Request, res: Response) => {
  logger.log({
    level: 'info',
    message: req.body.message,
    data: { file: __filename }
  })

  return response({ res, statusCode: 200, message: 'Hello world!' })
})

app.listen(port, () => {
  console.log(`Log: ~> app is up and running on ~> port-${port} on ENVIRONMENT ~> ${process.env.ENVIRONMENT}`)
})

module.exports = app
