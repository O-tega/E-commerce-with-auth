//module imports
const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const methodOverride = require('method-override');
const passport = require('passport');
const path = require('path')
// const MongoStore = require('connect-mongo')(session);
const MongoDBStore = require('connect-mongodb-session')(session)

//initiaze the express server
const app = express();

require('./config/passport')(passport);

//=============================import created modules ===============
const authRoute = require('./routes/authRoute.routes')
const pageRoute = require("./routes/allpages.routes");
const adminRoute = require("./routes/adminPage.routes")
const homeRoute = require('./routes/home.routes');
const productsRoute = require('./routes/products.routes');


app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

app.use(
    session({
        secret: 'secret',
        resave: true,
        store: new MongoDBStore({mongooseConnection: mongoose.connection}),
        saveUninitialized: true,
        cookie: {
            maxAge: 100 * 60 * 24,
        },
    })
)

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


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
		"http://localhost:5000/";
	next();
});


// set global variable for view
app.set('views', path.join(__dirname, 'views'))

//create static dir
app.use(
	express.static(
		path.join(__dirname, "public")
	)
);

// create a static directory for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, "admin")))

//check the user


// routes
app.use("/", authRoute);
app.use("/", pageRoute);
app.use('/admin', adminRoute);
app.use('/', homeRoute);
app.use('/products', productsRoute )


const PORT = process.env.PORT || 5000;



mongoose.connect('mongodb://localhost:27017/test1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
	useCreateIndex: true,
})
.then((res)=> console.log('successful'))
.catch((err)=> console.log(err))

app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})
