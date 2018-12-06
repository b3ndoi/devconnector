const express = require('express')

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile Model
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// const keys = 
// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: "Profile Works"});
});
// @route   GET api/profile
// @desc    Test posts route
// @access  Private
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Profile
        .findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
});
// @route   GET api/profile/handle/:handle
// @desc    Test posts route
// @access  Private
router.get('/handle/:handle', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Profile
        .findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
});
// @route   GET api/profile/user/:user_id
// @desc    Test posts route
// @access  Private
router.get('/user/:user_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Profile
        .findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err))
});
// @route   GET api/profile/all
// @desc    Test posts route
// @access  Private
router.get('/user/:user_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Profile
        .find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if(!profiles){
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => res.status(404).json(err))
});
// @route   POST api/profile
// @desc    Test posts route
// @access  Private
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.github) profileFields.github = req.body.github
    // Skills - Split into array
    if(typeof req.body.skills !== 'undefined'){ 
        profileFields.skills = req.body.skills.split(',');
    }
    profileFields.social = {}
    if(req.body.youtube) profileFields.youtube = req.body.youtube
    if(req.body.facebook) profileFields.facebook = req.body.facebook
    if(req.body.linkedin) profileFields.linkedin = req.body.linkedin
    if(req.body.instagram) profileFields.instagram = req.body.instagram
    if(req.body.twitter) profileFields.twitter = req.body.twitter
    // return res.json(profileFields);
    Profile.findOne({user: req.user.id})
        .then(profile => {
            // Updates user
            if(profile){
                Profile
                    .findOneAndUpdate({user: req.user.id}, { $set: profileFields }, { new: true})
                    .then(profile => res.json(profile))
                return;
            }
            // Check if handle exists
            Profile.findOne({handle: profileFields.handle})
                .then(profile => {
                    if(profile){
                        errors.handle = 'That handle already exists.'
                        return res.status(400).json(errors);
                    }

                    // Save profile

                    new Profile(profileFields).save().then(profile => res.json(profile))
                })
        })
});

// @route   POST api/experience
// @desc    Test posts route
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            // Updates user
            const { errors, isValid } = validateExperienceInput(req.body);
            if(isValid){
                return res.status(400).json(errors)
            }
            const {title, company, location, from, to, current, description} = req.body;
            const newExp = {title, company, location, from, to, current, description};
            profile.experience.unshift(newExp);
            profile.save().then(profile => res.json(profile));
        })
});
// @route   DELETE api/experience/:exp_id
// @desc    Test posts route
// @access  Private
router.post('/experience/:exp_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            // Updates user
            const removeIdex = profile.experience.map(item => idem.id).indexOf(req.param.exp_id);
            profile.experience.splice(removeIdex, 1);
            profile.save().then(profile=> res.json(profile))
        })
        .catch(err => res.status(404).json(err))
});
// @route   POST api/education
// @desc    Test posts route
// @access  Private
router.delete('/education', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            // Updates user
            const { errors, isValid } = validateEducationInput(req.body);
            if(!isValid){
                return res.status(400).json(errors)
            }
            const {school, degree, fieldofstudy, from, to, current, description} = req.body;
            const newEdu = {school, degree, fieldofstudy, from, to, current, description};
            profile.education.unshift(newEdu);
            profile.save().then(profile => res.json(profile));
        })
});
// @route   DELETE api/experience/:exp_id
// @desc    Test posts route
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            // Updates user
            const removeIdex = profile.education.map(item => idem.id).indexOf(req.param.edu_id);
            profile.education.splice(removeIdex, 1);
            profile.save().then(profile=> res.json(profile))
        })
        .catch(err => res.status(404).json(err))
});
router.delete('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    Profile.findOneAndRemove({user: req.user.id})
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
                .then(() => res.json({success: true}))
        })
});


module.exports = router;