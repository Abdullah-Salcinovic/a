const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Loan = sequelize.define('Loan', {
        loanDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        returnDate: { type: DataTypes.DATE },
    }, {
        timestamps: true, // Enable `createdAt` and `updatedAt`
        createdAt: 'createdAt', // Map Sequelize's `createdAt` to database
        updatedAt: 'updatedAt',
        allowNull: true, // Allow `NULL` values for these columns
    });
    Loan.associate = (models) => {
        Loan.belongsTo(models.User);
        Loan.belongsTo(models.Book);
    };
    return Loan;
};
