module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/login'); // Redirect unauthenticated users to login
        }
        next();
    },

    ensureAdmin: (req, res, next) => {
        if (!req.isAuthenticated() || req.user.role !== 'ADMIN') {
            return res.status(403).send('Access denied'); // Restrict non-admins
        }
        next();
    },
};
