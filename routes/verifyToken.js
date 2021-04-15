const jwt = require("jsonwebtoken");
const { access_token } = require("../config");

module.exports = function(req, res, next) {
	const token = req.header("Authorization");
	if (!token) {
		return res.status(401).json({
            message:"ACCESS DENIED"
        });
	}
	try {
		const verified = jwt.verify(token, access_token);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).json({
			message: "INVALID TOKEN",
		});
	}
};
