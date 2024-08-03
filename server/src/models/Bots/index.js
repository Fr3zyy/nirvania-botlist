const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    application: {
        id: String,
        ownerId: String,
        coOwners: [String]
    },
    profile: {
        username: String,
        avatar: String,
        shortDescription: {
            type: String,
            maxlength: 200
        },
        longDescription: String,
        prefix: String,
        tags: [String]
    },
    links: {
        invite: String,
        github: String,
        website: String,
        support: String,
        webhook: String
    },
    stats: {
        status: {
            type: String,
            enum: ['unverified', 'verified', 'rejected'],
            default: 'unverified'
        },
        votes: {
            type: Number,
            default: 0
        },
        promoted: {
            type: Boolean,
            default: false
        }
    },
    ratings: {
        type: Map,
        of: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bot', BotSchema);