const Sequelize = require('sequelize');
const db ={};
const sequelize = new Sequelize('userdb','root','',{
    host: 'localhost',
    dialect:'mysql',
    operatorsAlias: false,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
   define: {
        timestamps: false,
      }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;