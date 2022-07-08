const response = require('../../utils/response');

const dashboard = async (req, res) => {
	try {
	const data = req.body
  if (data) {
    console.log('Log: ~> file: index.js ~> line 7 ~> dashboard ~> data', data)
    return response(res, 200, true, 'Dashboard data', null)
  } else {
    return response(res, 401, false, 'No data Provided', null)
  }
	} catch (error) {
		return response(res, 500, false, 'Internal Server Error', error);
	}
};

module.exports = { dashboard };
