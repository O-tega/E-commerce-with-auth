// import express
const express = require("express");
// import mongoose
const mongoose = require("mongoose");
// import path
const path = require("path");
// import express session
const session = require("express-session");
//import flash
const flash = require("connect-flash");
// import passport
const passport = require("passport");
const  cookieParser = require('cookie-parser')

// import mongostore to save session
const MongoStore = require('connect-mongo');


//=============================import created modules ===============
const authRoute = require('./routes/authRoute.routes')
const pageRoute = require("./routes/allpages.routes");

//initialize express
const app = express();




//create port
PORT = process.env.PORT || 5500;
// connect mongodb

const url = "mongodb://localhost:27017/test1"
mongoose
	.connect( url,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		}
	)
	.then(() => {
		console.log(
			`Database connected successfully`
		);
	})
	.catch((err) => {
		console.log("Error: ", err);
	});

	const connection = mongoose.connection

	const sessionStore = MongoStore.create({
	mongoUrl: url,
	collection : 'sessions'
})

app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
		store: sessionStore,
		cookie: {maxAge: 6000}
	})
);

// app.use(cookieParser())

// passport config
require("./config/passport")(passport);

// set the views engine
app.set("view engine", "ejs");

//body parser middleware for rendering html
app.use(express.json());
app.use(express.urlencoded({extended: false}));



//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//see the session and the user
app.use((req,res,next)=>{
	console.log(req.user.role)
 	// console.log('cookie: ', req.session.cookie)
	next();
})

//connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash(
		"success_msg"
	);
	res.locals.error_msg = req.flash(
		"error_msg"
	);
	res.locals.error = req.flash("error");
	//set a local server name
 	req.server_url =
		"http://localhost:5500/";

	// console.log('Cookies',req.session)
	next();
});

//create static dir
app.use(
	express.static(
		path.join(__dirname, "public")
	)
);

// routes
app.use("/", authRoute);
app.use("/", authRoute);
app.use("/", pageRoute);


//create a local server
app.listen(PORT, () => {
	console.log(
		`Server running on http://127.0.0.1:${PORT}\nor http://localhost:${PORT}`
	);
});
