const jwt = require("jsonwebtoken");
const { access_token } = require("../config");

module.exports = function(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split('')[1]

	if (!token) {
		return res.status(401).json({
            message:"ACCESS DENIED"
        });
	} else {
		
		try {
			const verified = jwt.verify(token, access_token, (err, user) => {
				if(err) return res.sendStatus(403)
			});
			req.user = verified;
			next();
		} catch (err) {
			res.status(400).json({
				message: "INVALID TOKEN",
			});
		}
	}
};
