//get admin login
const passport = require('passport');


exports.getAdminLogin = async (
	req,
	res,
	next
) => {
	try {
		res.render("admin/login.ejs", {
			server_url: req.server_url,
			title: "Login",
		});
		// console.log(req.session)
	} catch (error) {
		next(error);
	}
};

// admin login
exports.postAdminLogin = async (
	req,
	res,
	next
) => {
	// console.log("Check: ", req.user)
	passport.authenticate("local", {
		successRedirect:
			"/admin/adminDashboard",
		failureRedirect: "/admin/login",
		failureFlash: true,
	})(req, res, next);
};

// get admin dashboard
exports.getAdminDashboard = async (req, res, next)=>{
    try{
        res.render('admin/adminDashboard', {
            server_url: req.server_url,
            title: 'Admin Dashboard'
        })
    }catch(error){
        next(error);
    }
}

// get logout
exports.adminlogout = async (
	req,
	res,
	next
) => {
	req.logout(),
		req.flash(
			"success_msg",
			"Your are logged out"
		),
		res.redirect("/admin/login");
};


// restrict users
exports.roles = (...roles) => {
	return (req, res, next) => {
		if (
			roles.includes(req.user.roles)
		) {
			req.flash("error_msg", "unrestricted access")
			return res.redirect("/login");
		}
		return next();
	};
};