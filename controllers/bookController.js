const { Book } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.findAll();
            res.render('books', { books });
        } catch (error) {
            console.error('Error fetching books:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    getBookById: async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id);
            if (!book) {
                return res.status(404).send('Book not found');
            }
            res.render('editBook', { book });
        } catch (error) {
            console.error('Error fetching book:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    updateBook: async (req, res) => {
        try {
            const { title, author, genre, thumbnail } = req.body;
            await Book.update({ title, author, genre, thumbnail }, { where: { id: req.params.id } });
            res.redirect('/books');
        } catch (error) {
            console.error('Error updating book:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    createBook: async (req, res) => {
        try {
            const { title, author, genre, thumbnail } = req.body;
    
            // Debug log to verify form data
            console.log('Form Data:', req.body);
    
            // Create a new book in the database
            await Book.create({ title, author, genre, thumbnail });
    
            // Redirect to the books list page
            res.redirect('/books');
        } catch (error) {
            console.error('Error creating book:', error);
            res.status(500).send('Internal Server Error');
        }
    },           
    deleteBook: async (req, res) => {
        try {
            await Book.destroy({ where: { id: req.params.id } });
            res.redirect('/books');
        } catch (error) {
            console.error('Error deleting book:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    getSearchBooks: async (req, res) => {
        try {
            const query = req.query.query.toLowerCase();
            const books = await Book.findAll({
                where: {
                    title: { [Op.like]: `%${query}%` }
                }
            });
            res.render('books', { books, title: 'Search Results' });
        } catch (error) {
            console.error('Error searching books:', error);
            res.status(500).send('Internal Server Error');
        }
    },    
};
