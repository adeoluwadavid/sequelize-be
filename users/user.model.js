const { DataTypes } = require("sequelize");

const db = require("../config/database");

const jobs = require("./user.job");
const attributes = {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
};

const options = {
  defaultScope: {
    // exclude hash by default
    attributes: { exclude: ["password"] },
  },
  scopes: {
    // include hash with this scope
    withHash: { attributes: {} },
  },
};
const User = db.define("User", attributes, options);
User.hasMany(jobs, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

module.exports = User;
