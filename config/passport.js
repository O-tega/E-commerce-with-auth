// import the config file
const LocalStrategy =
	require("passport-local").Strategy;
// import mongoose
const mongoose = require("mongoose");
//import bcrypt
const bcrypt = require("bcrypt");

// import models
const User = require("../models/User");

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" },
			(email, password, done) => {
				//match email
				User.findOne({ email: email })
					.then((user) => {
						if (!user) {
							return done(null, false, {
								message:
									"That email is not registered",
							});
						}
						//match password
						bcrypt.compare(
							password,
							user.password,
							(err, isMatch) => {
								if (err) throw err;

								if (isMatch) {
									return done(
										null,
										user
									);
								} else {
									return done(
										null,
										false,
										{
											message:
												"password incorrect",
										}
									);
								}
							}
						);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		)
	),
		passport.serializeUser(
			(user, done) => {
				done(null, user.id);
			}
		);

	passport.deserializeUser(
		(id, done) => {
			User.findById(
				id,
				function (err, user) {
					done(err, user);
				}
			);
		}
	);
};
