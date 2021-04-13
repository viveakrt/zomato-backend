const router = require("express").Router();

const { customer: User } = require("../models");
const { isEmail } = require("validator");


const customer = require("../models/customer");



router.post("/register", async (req, res) => {
	
    const newUser = {
		customer_name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};

	if (
		!(
			isEmail(newUser.email) &&
			newUser.customer_name.length > 3
		)
	) {
		res
			.status(400)
			.json({
				massage:
					"Use valid email Id and user using 4 or more characters without space",
			})
			.end();
		return;
	}

	//Checking if the user is already in the database
	const emailExist = await User.findOne({
		where: {
			email: newUser.email,
		},
	});
	if (emailExist !== null)
		return res
			.status(400)
			.json({
				message: `Email ${newUser.email} already exists`,
			})
			.end();
	const userExist = await User.findOne({
		where: {
			customer_name: newUser.customer_name,
		},
	}).catch((err) => {
		console.log(err);

		res.sendStatus(500).end();
	});
	if (userExist !== null)
		return res
			.status(400)
			.json({
				message: `User Name ${newUser.customer_name} not available use another`,
			})
			.end();

	await User.create(newUser)
		.then((userData) => {
			res
				.status(201)
				.json({
					userData,
				})
				.end();
		})
		.catch((err) => {
			console.log(err);

			res.sendStatus(500).end();
		});
});





module.exports = router;
