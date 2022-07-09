import response from '../../../utils/response'

/**
 * @description: Login user
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} - response object
 */
const login = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body
    console.log('Log: ~> file: index.ts ~> line 6 ~> login ~> otp', otp)
    console.log('Log: ~> file: index.ts ~> line 6 ~> login ~> mobileNumber', mobileNumber)
    if (mobileNumber === '9604374093' && otp === '1234') {
      return response(res, 200, true, 'Used loggedIn successfully!', null)
    } else {
      return response(res, 401, false, 'Wrong Mobile Number Or OTP Provided', null)
    }
  } catch (error) {
    return response(res, 500, false, 'Internal Server Error', error)
  }
}

module.exports = login
