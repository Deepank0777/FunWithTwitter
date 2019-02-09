const jwt               =   require('jsonwebtoken');
const config            =   require('../config')
const UserModel         =   require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing tests.
 */
 module.exports = {

    login: function(req, res) {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail = emailRegExp.test(req.body.identifier);
        let param = { email: req.body.identifier };

        if(!isEmail) { param = { username: req.body.identifier }; }
        
        UserModel.findOne(param, function (err, user) {

            if (err) return res.status(500).json({ 
                status: 'error', 
                message: 'Internal Server Error. Please contanct admin.' 
            });

            if (!user) return res.status(404).json({
                status: 'error', 
                message: 'Invalid Username/Password.' 
            });

            if(req.body.password != user.password){
            	return res.status(401).send({ auth: false, token: null ,message:'wrong password'});
            }

            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token, user: user });
            res.end();
        });
    },

    logout: function(req, res) {
        return res.status(200).send({ state: 'Logout', token: null });
    },

    register: function (req, res) {
        req.checkBody('fullname', 'Full Name is required').notEmpty();
        req.checkBody('email',  'Email is Empty or Invalid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
        req.checkBody('phone', 'phone is not valid').matches(/^[0-9]{10}$/, "i");

        let errors = req.validationErrors();

        if(errors){
            let message=[];
            for (var i=0; i < errors.length; i++) {
                message[i] = errors[i].msg;
            }
            return res.status(400).send({error:message});
        }

        let findUserName = function() {
            return new Promise(function(resolve, reject) {
                UserModel.findOne({ username: req.body.username }, function(err, user) {
                    if(!user) {
                        resolve('username available');
                    } else {
                        reject('username already taken please try taking new username');
                    } 
                });
                
            });
        };

        let findEmail = function(message) {
            return new Promise(function(resolve, reject) {
                UserModel.findOne({ email: req.body.email }, function(err, user) {
                    if(!user) {
                        resolve(message + 'User does not exist');
                    } else {
                        reject('E-mail already exist please Login');
                    } 
                });
            });
        };

        findUserName().then(function(){
            return findEmail()
        }).then(function(){
            const user = new UserModel({
                fullname : req.body.fullname,
                username : req.body.username,
                email    : req.body.email,
                password : req.body.password
            })
            user.save(function(err,user){
                if(err) return res.status(500).json({message:'failed to register user',err:err})

                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.status(201).json({message:`user created successfully`,token: token, user: user})  
            })
        }).catch(function(err){
            return res.status(400).json({'status':false,'error':err})
        })   
            
    }
};
