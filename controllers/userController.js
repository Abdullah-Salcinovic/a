const { User } = require('../models');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.render('users', { users });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            res.render('editUser', { user });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    updateUser: async (req, res) => {
        try {
            const { username, role } = req.body;
            await User.update({ username, role }, { where: { id: req.params.id } });
            res.redirect('/users');
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.destroy({ where: { id: req.params.id } });
            res.redirect('/users');
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    createUser: async (req, res) => {
        try {
            const { username, password, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ username, password: hashedPassword, role });
            res.redirect('/users');
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    
};
