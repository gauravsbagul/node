import { Request, Response } from 'express'

import axios from 'axios'
import { response, reject } from '../../../utils/response'
import { logger } from '../../../logger'
/**
 * @description: Login user
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns {Response} - response object
 */
const login = async (req: Request, res: Response) => {
  try {
    const { mobileNumber, otp } = req.body
    if (mobileNumber === '9604374093' && otp === '1234') {
      return response({ res, statusCode: 200, message: 'Used loggedIn successfully!', data: null })
    } else {
      return response({
        res,
        statusCode: 401,
        message: 'Wrong Mobile Number Or OTP Provided'
      })
    }
  } catch (error: unknown) {
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
      data: { error, file: __filename, from: req.originalUrl }
    })
    return reject({ res, statusCode: 500, message: 'Internal Server Error', error })
  }
}

export default login
