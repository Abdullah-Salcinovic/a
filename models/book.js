const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Book = sequelize.define('Book', {
        title: { type: DataTypes.STRING, allowNull: false },
        author: { type: DataTypes.STRING, allowNull: false },
        genre: { type: DataTypes.STRING },
        thumbnail: { type: DataTypes.STRING, allowNull: true } // Field for thumbnail URL
    }, {
        timestamps: true, // Enable `createdAt` and `updatedAt`
        createdAt: 'createdAt', // Map Sequelize's `createdAt` to database
        updatedAt: 'updatedAt',
        allowNull: true, // Allow `NULL` values for these columns
    });
    return Book;
};
