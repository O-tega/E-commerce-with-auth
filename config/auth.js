module.exports = {
    ensureAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'You have to login in to access this page')
        return (res.redirect('/login'))
    }
}



module.exports.isAdmin = (req, res, next)=>{
     if(req.isAuthenticated() && req.user.roles ==='admin'){
            return next();
        }
        req.flash('error_msg', 'urestricted access')
        return (res.redirect('/login'))
}


exports.roles = (...roles) => {
	console.log(roles.includes(req.user.roles))
	return (req, res, next) => {
		if (
			roles.includes(req.user.roles)
			) {
				return next();
			}
			req.flash(
				"error_msg",
				"unrestricted access"
				);
				return res.redirect("/login");
			};
		};
		