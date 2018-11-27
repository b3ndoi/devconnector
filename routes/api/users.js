const express = require('express')

const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secretOrKey;
const passport = require('passport');

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
    const {name,email,password} = req.body;
    User.findOne({
        email: email
    })
    .then(user => {
        if(user){
            return res.status(400).json({email: 'Email already exists'})
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
    
    // Find user
    User.findOne({email})
        .then((user) => {
            // Check for user
            if(!user){
                return res.status(404).json({email: 'User email not found'})
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch){
                        return res.status(400).json({password: 'Password incorect'})
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
router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.json(req.user);
});

module.exports = router;