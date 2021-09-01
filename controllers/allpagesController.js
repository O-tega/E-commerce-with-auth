exports.getDashboard= (req, res, next)=>{
    res.render('dashboard', {
        server_url: req.server_url,
        title: 'Dashboard'
    })
}