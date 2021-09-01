module.exports = {
    ensureAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'You have to login in to access this page')
        return (res.redirect('/login'))
    }
}