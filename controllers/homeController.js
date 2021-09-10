// import multer it helps process multipart data
const multer = require("multer");
// import system modules
const path = require('path') 






const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, './uploads/complaint_img/')
    },

    filename: (req, file, callback)=>{
        callback(null, `${Date.now()}-${file.originalname}`)
    },
});

const upload = multer({
    storage,
    limits: {fileSize: 100000},
    fileFilter: (req, file, callback)=>{
        const extname = path.extname(file.originalname).toLowerCase();
        if (extname == '.jpg' || extname == '.png' || extname == 'jpeg' || extname == '.txt'){
            return callback(null, true);
        }
        return callback(new Error('file type not supported'), false);
    } 
}).single('file')

exports.home = (req, res, next) => {
	res.render("home.ejs", {
		title: "Home",
		server_url: req.server_url,
	});
};

exports.complaint = (
	req,
	res,
	next,
) => {
	res.render("complaint", {
		title: "complaint page",
		server_url: req.server_url,
	});
};

exports.about = (req, res, next) => {
	res.render("about", {
		title: "About Us",
		server_url: req.server_url,
	});
};

exports.postComplaint = (
	req,
	res,
	next,
) => {
    upload(req, res, (err) => {
        if(err){
            return next(new Error(err));
        }
        res.send({body: req.body, file: req.file})
    })
};
