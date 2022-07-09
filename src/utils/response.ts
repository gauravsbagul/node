import { Response } from 'express'

/**
 * @param {Object} response
 * @param {Number} statusCode
 * @param {Boolean} status
 * @param {String} message
 * @param {Object} data
 *
 * @description
 * Resolves the response object
 * @returns {Object}
 *
 */
interface ResponseParams {
  res: Response
  statusCode: number
  message: string | string[]
  data?: object | null
  error?: unknown | object | null
}

export const response = ({ res, statusCode, message, data = null }: ResponseParams): object => {
  return res.status(statusCode).json({
    status: true,
    message,
    data
  })
}

/**
 * @param {Object} response
 * @param {Number} statusCode
 * @param {String} message
 * @param {Object} data
 *
 * @description
 * Reject the response to the client as JSON
 * @returns {Object}
 *
 */
interface RejectParams {
  res: Response
  statusCode: number
  message: string | string[]
  error?: unknown | null
}

export const reject = ({ res, statusCode, message, error = null }: RejectParams): object => {
  return res.status(statusCode).json({
    status: false,
    message,
    error
  })
}
