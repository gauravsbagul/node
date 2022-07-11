import { Response, Request } from 'express'
import { logger } from '../../logger'
import { reject, response } from '../../utils/response'

/**
 * @description: Dashboard data
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns {Response} - response object
 */
export const dashboard = async (req: Request, res: Response) => {
  try {
    const data = req.body
    if (data) {
      console.log('Log: ~> file: index.js ~> line 7 ~> dashboard ~> data', data)
      return response({ res, statusCode: 200, message: 'Dashboard data' })
    } else {
      return response({ res, statusCode: 401, message: 'No data Provided' })
    }
  } catch (error: any) {
    logger.error({
      level: 'error',
      message: req.body.message,
      data: { error, file: `src${__filename.split('src')[1]}`, line: 42 }
    })
    return reject({ res, statusCode: 500, message: 'Internal Server Error', error })
  }
}
