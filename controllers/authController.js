const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) return done(null, false, { message: 'User not found' });
            const match = await bcrypt.compare(password, user.password);
            if (!match) return done(null, false, { message: 'Invalid password' });
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});

module.exports = {
    login: passport.authenticate('local', {
        successRedirect: '/books',
        failureRedirect: '/login',
    }),
    register: async (req, res) => {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword, role });
        res.redirect('/login');
    },
};
