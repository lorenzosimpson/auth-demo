const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const dbConnection = require('./database');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 3000
// Route requires
const user = require('./routes/user');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');


// MIDDLEWARE
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'"],
				styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
				imgSrc: ["'self'", 'https://i.ytimg.com'],
				fontSrc: ["'self'", 'https://fonts.gstatic.com'],
				objectSrc: ["'self'"],
				mediaSrc: ["'self'"],
			},
		}
	})
);

// Sessions
app.use(
	session({
		secret: process.env.SECRET, //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)

if (process.env.NODE_ENV !== "development") {
	app.use(express.static(path.join(__dirname, 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/build/index.html'));
	});
}


// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})