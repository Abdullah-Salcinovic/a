const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();

router.get('/login', (req, res) => res.render('login'));
router.post('/login', login);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);

module.exports = router;
