const { DataTypes } = require('sequelize');

const db = require('../config/database')
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: false },
        technologies: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        budget: { type: DataTypes.STRING, allowNull: false },
        contact_email: { type: DataTypes.STRING, allowNull: false },
    };

const Jobs = db.define('Jobs',attributes)

module.exports = Jobs


