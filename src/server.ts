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
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const server: Application = express()

server.use(cors())
server.use(bodyParser.json({ limit: '50mb' }))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

server.use('/', express.static(path.join()))

server.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
  next()
})

//Extend : https://swagger.io/docs/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Node API',
      version: '1.0.0',
      description: 'Node API',
      contact: {
        name: 'Gaurav'
      },
      servers: ['http://localhost:5000']
    }
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['app.ts']
}

const swaggerDoc: object = swaggerJSDoc(swaggerOptions)
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

server.use('/auth', auth)
server.use('/dashboard', dashboardRouter)

server.use('/', (req: Request, res: Response) => {
  logger.log({
    level: 'info',
    message: req.body.message,
    data: { file: `src${__filename.split('src')[1]}` }
  })

  return response({ res, statusCode: 200, message: 'Hello world!' })
})

export default server
