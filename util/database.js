const Sequelize = require('sequelize');

const sequelize = new Sequelize('baba123','root','Toton@612',{dialect: 'mysql',host:'localhost'});

module.exports = sequelize;