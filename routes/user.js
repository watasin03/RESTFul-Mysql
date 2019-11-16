const express = require('express');
const users = express.Router();
const authCheck = require('../middleware/authCheck');

const userControllers = require('../controllers/userControllers');

//Register
users.post('/signup',userControllers.user_register);

//Login
users.post('/login',userControllers.user_login);

//Get User Profile
users.get('/detail',authCheck,userControllers.user_detail);

//Get All User Profile
users.get('/',authCheck,userControllers.user_all);

//Update User Profile
users.put('/edit', authCheck, userControllers.user_update);

//Delete User Profile by Id
users.delete('/delete/:id', authCheck, userControllers.user_delete);

module.exports = users;