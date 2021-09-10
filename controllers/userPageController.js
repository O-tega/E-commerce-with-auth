exports.getDashboard= async (req, res, next)=>{
    try{
        res.render('dashboard', {
            server_url: req.server_url,
            title: 'Dashboard'
        })
    }catch(error){
        next(error)
    }
}
