/**
 *
 * @param {Object} res
 * @param {Number} statusCode
 * @param {Boolean} status
 * @param {String} message
 * @param {Object} data
 *
 * @description
 * Send the response to the client as JSON
 *
 * @returns {Object}
 *
 */

module.exports = (res, statusCode, status, message, data) => {
	return res.status(statusCode).json({
		status,
		message,
		data,
	});
};
