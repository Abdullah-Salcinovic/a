const express = require('express');
const { getAllLoans, getLoanById, updateLoan, deleteLoan, createLoan } = require('../controllers/loanController');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

router.use(ensureAuthenticated)

// Fetch all loans
router.get('/', getAllLoans);
router.get('/new', (req, res) => res.render('addLoan')); // Render the add form

// Fetch a specific loan (Edit Page)
router.get('/:id', getLoanById);

// Update loan details
router.post('/:id/edit', updateLoan);

// Delete a loan
router.get('/:id/delete', deleteLoan);

router.post('/new', createLoan); // Handle form submission

module.exports = router;
