const express = require('express')

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secretOrKey;
const passport = require('passport');

// Load input validation
const validateRegiserInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const UsersController = require('../../controllers/UsersController');

// Load user model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: "Users Works"});
});


// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegiserInput(req.body);
    const {name,email,password} = req.body;

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({
        email: email
    })
    .then(user => {
        if(user){
            errors.email = 'Email already exists'
            return res.status(400).json(errors)
        }
        let avatar = gravatar.url(email, {
            s: 200,
            r: 'pg',
            d:'mm'
        })

        const newUser = new User({
            name,email, password, avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => res.json(err))
            });
        })
    });

});

// @route   POST api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    // Find user
    User.findOne({email})
        .then((user) => {
            // Check for user
            if(!user){
                errors.email = 'User email not found'
                return res.status(404).json(errors)
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch){
                        errors.password = 'Password incorect'
                        return res.status(400).json(errors)
                    }
                    // User Matched

                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar,
                    }
                    // Sign Token
                    jwt.sign(payload, key, {expiresIn: 3600},
                        (err, token)=>{
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    // res.json({msg:'Success'})
                })
        })
})
// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => UsersController.current(req, res));

module.exports = router;