//importing models
const User = require("../models/User");

//importing passport
const passport = require("passport");

exports.getSignup = async (
	req,
	res,
	next
) => {
	try {
		res
			.status(200)
			.render("signup.ejs", {
				server_url: req.server_url,
				title: "signup",
			});
	} catch (error) {
		next(error);
	}
};

exports.postSignup = async (
	req,
	res,
	next
) => {
	try {
		const {
			name,
			email,
			password,
			confirmPassword,
		} = req.body;
		let errors = [];

		if (
			!name ||
			!email ||
			!password ||
			!confirmPassword
		) {
			errors.push({
				msg: "all fields are required",
			});
		}
		if (password !== confirmPassword) {
			errors.push({
				msg: "Both password must be the same",
			});
		}
		if (password.length < 6) {
			errors.push({
				msg: "Password must be minimum of 6 character",
			});
		}

		if (errors.length > 0) {
			res.render("signup.ejs", {
				server_url: req.server_url,
				title: "Signup",
				errors,
				name,
				email,
			});
		} else {
			const user = new User({
				name,
				email,
				password,
				confirmPassword,
			});

			const userone =
				await User.findOne({
					email: email,
				});
			if (!userone) {
				console.log(req.body);
				await user
					.save()
					.then((user) => {
						req.flash(
							"success_msg",
							"You are now registered and can log in"
						);
						res.redirect("login");
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				errors.push({
					msg: "Email already registered",
				});
				res.render("signup.ejs", {
					server_url: req.server_url,
					errors,
					name,
					email,
				});
			}
			// using the model to create a user in the database
		}
		// console.log(req.body)
		// res.status(201).send('hello');
	} catch (error) {
		next(error);
	}
};

exports.getlogin = async (
	req,
	res,
	next
) => {
	try {
		res.render("login.ejs", {
			server_url: req.server_url,
		});
		// console.log(req.session)
 	} catch (error) {
		next(error);
	}
};

exports.postlogin = async (
	req,
	res,
	next
) => {
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/login",
		failureFlash: true,
	})(req, res, next);
};

exports.logout = async (
	req,
	res,
	next
) => {
	req.logout(),
		req.flash(
			"success_msg",
			"Your are logged out"
		),
		res.redirect("/login");
};


exports.roles=(...roles)=>{
	return(req, res, next)=>{
		if(roles.includes(req.user.roles)){
			return res.redirect('/');
		}
		return next();
	};
};
