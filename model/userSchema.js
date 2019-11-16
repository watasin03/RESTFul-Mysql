const Sequelize = require('sequelize');
const db = require('../db/connect')
module.exports = db.sequelize.define('user_tables',
    {
        id: {
            type:Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        password:{
            type: Sequelize.STRING, 
            allowNull: false
        },
        email:{
            type: Sequelize.STRING, 
            allowNull: false
        },
        name:{
            type: Sequelize.STRING, 
            allowNull: false
        },
        branch:{
            type: Sequelize.STRING, 
            allowNull: false
        }
}); 