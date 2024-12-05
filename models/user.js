const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'USER' },
    }, {
        timestamps: true, // Enable `createdAt` and `updatedAt`
        createdAt: 'createdAt', // Map Sequelize's `createdAt` to database
        updatedAt: 'updatedAt',
        allowNull: true, // Allow `NULL` values for these columns
    });
    return User;
};
