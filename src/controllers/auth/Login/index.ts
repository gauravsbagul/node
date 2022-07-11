import { Request, Response } from 'express'
import axios from 'axios'
import { logger } from '../../../logger'
import { reject, response } from '../../../utils/response'

/**
 * @swagger
 * /auth/login:
 *  post:
 *   description: Login to the application
 *  consumes:
 *  - application/json
 * produces:
 * - application/json
 * parameters:
 *  - name: mobileNumber
 *   in: body
 *  description: Mobile Number
 * required: true
 * schema:
 *  type: string
 * example: 9604374093
 * - name: otp
 *  in: body
 * description: OTP
 * required: true
 * schema:
 * type: string
 * example: 1234
 * responses:
 * 200:
 *  description: Successfully logged in
 * schema:
 * type: object
 * example:
 * {
 *  "statusCode": 200,
 * "message": "Used loggedIn successfully!",
 * "data": null
 * }
 * 401:
 * description: Wrong Mobile Number Or OTP Provided
 * schema:
 * type: object
 * example:
 * {
 * "statusCode": 401,
 * "message": "Wrong Mobile Number Or OTP Provided"
 * }
 * 500:
 * description: Internal Server Error
 * schema:
 * type: object
 * example:
 * {
 * "statusCode": 500,
 * "message": "Internal Server Error"
 * }
 * 400:
 * description: Bad Request
 * schema:
 * type: object
 * example:
 * {
 * "statusCode": 400,
 * "message": "Bad Request"
 * }
 * 404:
 * description: Not Found
 * schema:
 * type: object
 * example:
 * {
 * "statusCode": 404,
 * "message": "Not Found"
 * }
 * 405:
 * description: Method Not Allowed
 * schema:
 * type: object
 * example:
 * {
 * "statusCode": 405,
 * "message": "Method Not Allowed"
 * }
 * 406:
 * description: Not Acceptable
 * schema:
 * type: object
 * example:
 * {
 * "statusCode": 406,
 * "message": "Not Acceptable"
 * }
 * 415:
 * description: Unsupported Media Type
 * schema:
 * type: object
 * example:
 * {
 * "statusCode": 415,
 * "message": "Unsupported Media Type"
 * }
 * 422:
 * description: Unprocessable Entity
 * schema:
 * type: object
 * example:
 * {
 * "statusCode": 422,
 * "message": "Unprocessable Entity"
 * }
 *
 */
const login = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, otp, name } = req.body
    if (mobileNumber.name.mob === '9604374093' && otp.name.otp === '1234' && name.lastname.name === 'gaurav') {
      return response({ res, statusCode: 200, message: 'Used loggedIn successfully!', data: null })
    } else {
      return response({
        res,
        statusCode: 401,
        message: 'Wrong Mobile Number Or OTP Provided'
      })
    }
  } catch (error: any) {
    console.log('Log: ~> file: index.ts ~> line 129 ~> login ~> error', JSON.stringify(error))
    if (error instanceof TypeError) {
      // A TypeError
    } else if (error instanceof RangeError) {
      // Handle the RangeError
    } else if (error instanceof EvalError) {
      // you guessed it: EvalError
    } else if (typeof error === 'string') {
      // The error is a string
    } else if (axios.isAxiosError(error)) {
      // axios does an error check for us!
    } else {
      // everything else
    }
    logger.error({
      level: 'error',
      message: req.body.message,
      data: { error, file: `src${__filename.split('src')[1]}`, from: req.originalUrl }
    })
    return reject({ res, statusCode: 500, message: 'Internal Server Error', error })
  }
}

export default login
