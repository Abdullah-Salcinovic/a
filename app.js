const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./models');

// Initialize environment variables
dotenv.config();

// Import routes
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const loanRoutes = require('./routes/loans');

// Initialize Express app
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    res.locals.user = req.user; // Add the logged-in user to `res.locals`
    next();
});

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/loans', loanRoutes)
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to the books page
});

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
