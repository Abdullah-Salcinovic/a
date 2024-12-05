const { Loan } = require('../models');

module.exports = {
    getAllLoans: async (req, res) => {
        try {
            const loans = await Loan.findAll();
            res.render('loans', { loans });
        } catch (error) {
            console.error('Error fetching loans:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    getLoanById: async (req, res) => {
        try {
            const loan = await Loan.findByPk(req.params.id);
            res.render('editLoan', { loan });
        } catch (error) {
            console.error('Error fetching loan:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    updateLoan: async (req, res) => {
        try {
            const { userId, bookId, returnDate } = req.body;
            await Loan.update({ userId, bookId, returnDate }, { where: { id: req.params.id } });
            res.redirect('/loans');
        } catch (error) {
            console.error('Error updating loan:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    deleteLoan: async (req, res) => {
        try {
            await Loan.destroy({ where: { id: req.params.id } });
            res.redirect('/loans');
        } catch (error) {
            console.error('Error deleting loan:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    createLoan: async (req, res) => {
        try {
            const { userId, bookId, loanDate } = req.body;
            await Loan.create({ userId, bookId, loanDate });
            res.redirect('/loans');
        } catch (error) {
            console.error('Error creating loan:', error);
            res.status(500).send('Internal Server Error');
        }
    },    
};
