const express = require('express')

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');
// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get('/test', (req, res) => {
    res.json({msg: "Posts Works"});
});
// @route   POST api/posts
// @desc    Test post route
// @access  Public
router.post('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    // Get fields
    const {user} = req;
    const { text} = req.body;
    const postFields = {};
    postFields.user = user.id;
    postFields.name = user.name;
    postFields.avatar = user.avatar;
    postFields.text = text;
    // return res.json(profileFields);
    new Post(postFields).save().then(post => res.json(post))
});
// @route   POST api/posts
// @desc    Test post route
// @access  Public
router.get('/', (req, res) => {
    
    // Get fields
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => {
        errors.post = 'Posts not found';
        return res.status(404).json(errors)
    })
});
// @route   POST api/posts
// @desc    Test post route
// @access  Public
router.get('/:post_id', (req, res) => {
    const errors = {};
    Post.findById(req.params.post_id).then(post => {
        if(!post){
            errors.post = 'Post not found';
            return res.status(404).json(errors)
        }
        return res.json(post)
    })
    .catch(err => {
        errors.post = 'Post not found';
        return res.status(404).json(errors)
    })
});
// @route   POST api/posts
// @desc    Test post route
// @access  Public
router.delete('/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if(post.user.toString() !== req.user.id){
                        errors.notauthorized = 'User not authorized';
                        return res.status(404).json(errors)
                    }

                    post
                        .remove()
                        .then(() => res.json({success: true}))
                })
                .catch(err => {
                    errors.post = 'Post not found';
                    return res.status(404).json(errors)
                })
        })
});
// @route   POST api/posts
// @desc    Like post
// @access  Private
router.post('/like/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                          .length > 0
                      ) {
                        return res
                          .status(400)
                          .json({ alreadyliked: 'User already liked this post' });
                      }
            
                      // Add user id to likes array
                      post.likes.unshift({ user: req.user.id });
            
                      post.save().then(post => res.json(post));
                })
                .catch(err => {
                    errors.post = 'Post not found';
                    return res.status(404).json(errors)
                })
        })
});
// @route   POST api/posts
// @desc    Unlike post route
// @access  Private
router.post('/unlike/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                          .length === 0
                      ) {
                        return res
                          .status(400)
                          .json({ notliked: 'You have not yet liked this post' });
                      }
            
                      // Get remove index
                      const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
            
                      // Splice out of array
                      post.likes.splice(removeIndex, 1);
            
                      // Save
                      post.save().then(post => res.json(post));
                })
                .catch(err => {
                    errors.post = 'Post not found';
                    return res.status(404).json(errors)
                })
        })
});

// @route   POST api/posts
// @desc    Unlike post route
// @access  Private
router.post('/comment/:post_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Post.findById(req.params.post_id)
        .then(post => {
            const { errors, isValid } = validateCommentInput(req.body);
            if(!isValid){
                return res.status(400).json(errors)
            }
            const {name, avatar, id} = req.user
            const {text} = req.body;
            const newComment= {text, name, avatar, user:id};
            post.comments.unshift(newComment)
            post.save().then(post => res.json(post))
        })
        .catch(err => {
            errors.post = 'Post not found';
            return res.status(404).json(errors)
        })
});
// @route   POST api/posts
// @desc    Like post
// @access  Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                        errors.comments = 'Comment does not exist';
                        return res.status(404).json(errors)
                    }
                    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id)
                    post.comments.splice(removeIndex, 1)
                    post.save().then(post => res.json(post))
                })
                .catch(err => {
                    errors.post = 'Post not found';
                    return res.status(404).json(errors)
                })
        })
});
module.exports = router;