const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const User = require('../model/userSchema');

exports.user_register = (req,res)=>{
    const userData = {
        branch: req.body.branch,
        password: req.body.password,
        email:req.body.email,
        name:req.body.name,
    }
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user =>{
        if(!user){
           const hash = bcrypt.hashSync(userData.password, 10);
          userData.password = hash;
            User.create(userData)
                .then(user =>{
                    res.json({
                        message:'Create User Success',
                        result:user
                    });
                })
                .catch(err=>{
                    res.send('error:'+err);
                })
        } else {
            res.json({ error : 'User Already Exists'});
        }
    })
    .catch(err=>{
        res.send('error:'+err);
    })
};

exports.user_login = (req,res)=>{
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user=>{
        if(user.dataValues == false) {
            res.send('User does not exist');
        }
         else {
            bcrypt.compareSync(req.body.password, user.password) 
            let token = jwt.sign(user.dataValues,config.get('secret'),
            {
                expiresIn:1440
            });
            res.json({token:token});
        }
    })
    .catch(err=>{
        res.send('error:'+err);
    });
};

exports.user_detail = (req,res)=>{
        User.findAll({
            where: {
            email: req.body.email
        }
    })
    .then(user=>{
        if(user){
            res.json(user);
        } else {
            res.send('User does not exist');
        }
    })
    .catch(err =>{
        res.send('error:'+err);
    });
};

exports.user_all = (req,res)=>{
    User.findAll()
    .then(user=>{
        if(user){
            res.json(user);
        } else {
            res.send('User does not exist');
        }
    })
    .catch(err =>{
        res.send('error:'+err);
    });
};

exports.user_delete = (req,res)=>{
    User.destroy({
            where: {
            id: req.params.id
        }
    })
    .then(user=>{
        if(user){
            res.status(201).json({
                message: 'User id: '+req.params.id+' has been removed'
            });
        } else {
            res.send('User does not exist');
        }
    })
    .catch(err =>{
        res.send('error:'+err);
    });
};

exports.user_update = (req,res)=>{
    User.update(req.body,{
        where: {
            email: req.body.email
        }
    })
    .then(user=>{
        if(user){
            res.status(201).json({
                message:'success',
                result: user
            })
        } else {
            res.send('User does not exist');
        }
    })
    .catch(err =>{
        res.send('error:'+err);
    });
};