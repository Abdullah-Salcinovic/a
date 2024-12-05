const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser, createUser } = require('../controllers/userController');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.use(ensureAuthenticated)
// Fetch all users
router.get('/', getAllUsers);
router.get('/new', (req, res) => res.render('addUser')); // Render the add form

// Fetch a specific user (Edit Page)
router.get('/:id', getUserById);

// Update user details
router.post('/:id/edit', updateUser);

// Delete a user
router.get('/:id/delete', deleteUser);

router.post('/new', createUser); // Handle form submission

module.exports = router;
