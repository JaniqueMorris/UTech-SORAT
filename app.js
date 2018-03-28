const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const assessment = require('./routes/assessment');
const questions = require('./routes/questions');

const port = 4000;

const app = express();

// passport config
require('./config/passport')(passport);

// Set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

// mongoose middleware
// map global promise
mongoose.Promise = global.Promise;
// connect ot mongoose
mongoose.connect('mongodb://localhost/utechsorat-dev')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// express-handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express session midleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  
  // passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(flash());
  
  // global variables
  app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// index route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
});

// about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

// specific routes
app.use('/users', users);
app.use('/assessment', assessment);
app.use('/questions', questions);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})