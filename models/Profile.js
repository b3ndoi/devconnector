const mongoose = require('mongoose')
const Schema = mongoose.Schema;


// Create Schema
const ProfileSchema  = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company:{
        type: String,
        required: false
    },
    website:{
        type: String,
        required: false
    },
    location:{
        type: String,
        required: false
    },
    status:{
        type: String,
        required: true
    },
    skills: {
        type: [String],
        requied: true
    },
    bio:{
        type: String
    },
    github:{
        type: String
    },
    expirience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: false
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: false
            },
            current: {
                type: Boolean,
                defult: false
            },
            description: {
                type: String,
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: false
            },
            current: {
                type: Boolean,
                defult: false
            },
            description: {
                type: String,
            }
        }
    ],
    social:{
        youtube:{
            type: String,
            required: false
        },
        facebook:{
            type: String,
            required: false
        },
        twitter:{
            type: String,
            required: false
        },
        instagram:{
            type: String,
            required: false
        },
        linkedin:{
            type: String,
            required: false
        },
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)