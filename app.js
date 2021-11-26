const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const Candidate = require("./models/candidate");
const Interviewer = require("./models/interviewer");
const Interview = require("./models/interview");
const seedDB = require("./seeds");
const mailer = require("./mailer");
const app = express();

const interviewRoutes = require("./routes/interview");
const indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use( bodyParser.urlencoded( { extended:true } ) );
app.use(methodOverride("_method"));
app.locals.moment = require("moment");
app.use(cookieParser());
app.use(session({
    secret : "Hala Madrid",
    cookie : {maxAge: 50000},
    resave : false,
    saveUninitialized : false
}))
app.use(flash());
app.use((req, res, next)=>{
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    if(!req.session){
        return next(new Error('Oh no Session Error'))
    }
    next();
})

mongoose.connect('mongodb://localhost/interviewCreation', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
	console.log('Connected to MongoDB Database!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

seedDB();

app.use("/interview", interviewRoutes);
app.use("/", indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Interview Creation Portal Server is started on port ${port}`);
});