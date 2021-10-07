exports.getDashboard= async (req, res, next)=>{
    try{
        res.render(
            'dashboard', {
            server_url: req.server_url,
            title: 'Dashboard',
            isAdmin: req.user.role === 'admin' ? true : false
        },
          console.log('user: ', req.user.role))
    }catch(error){
        next(error)
    }
}
