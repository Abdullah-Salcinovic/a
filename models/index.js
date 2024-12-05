const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false, // Disable logging SQL queries (optional)
});

sequelize.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Unable to connect to the database:', err));

sequelize.sync({ alter: true })
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Error synchronizing database:', err));


// Load models
const db = {};
db.sequelize = sequelize;
db.Book = require('./book')(sequelize);
db.User = require('./user')(sequelize);
db.Loan = require('./loan')(sequelize);

module.exports = db;
