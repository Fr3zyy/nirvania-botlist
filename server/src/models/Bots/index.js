const mongoose = require('mongoose');
const { Schema } = mongoose;

const BotSchema = new Schema({
    bot: {
        id: String,
        ownerId: String,
        coOwners: [{ type: String }]
    },
    profile: {
        username: String,
        avatar: String,
        banner: String,
        shortDescription: {
            type: String,
            maxlength: [200, 'Short description cannot exceed 200 characters']
        },
        longDescription: String,
        prefix: String,
        tags: [{ type: String, lowercase: true, trim: true }]
    },
    links: {
        invite: {
            type: String,
            validate: {
                validator: (v) => /^https?:\/\/.+/.test(v),
                message: props => `${props.value} is not a valid URL!`
            },
            required: true
        },
        github: { required: false, type: String, match: /^https?:\/\/(www\.)?github\.com\/.+/ },
        website: { required: false, type: String, match: /^https?:\/\/.+/ },
        support: { required: false, type: String, match: /^https?:\/\/(discord\.gg|discordapp\.com\/invite)\/.+/ },
        webhook: { required: false, type: String, match: /^https?:\/\/.+/ }
    },
    stats: {
        status: {
            type: String,
            enum: ['unverified', 'verified', 'rejected'],
            default: 'unverified'
        },
        votes: {
            type: Number,
            default: 0,
            min: [0, 'Votes cannot be negative']
        },
        votes: {
            type: Number,
            default: 0,
            min: [0, 'Views cannot be negative']
        },
        promoted: {
            type: Boolean,
            default: false
        }
    },
    ratings: {
        type: Map,
        of: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

BotSchema.index({ 'profile.username': 'text', 'profile.shortDescription': 'text' });


BotSchema.pre('save', function (next) {
    this.lastModified = new Date();
    next();
});

module.exports = mongoose.model('Bot', BotSchema);