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
            }
        },
        github: { type: String, match: /^https?:\/\/(www\.)?github\.com\/.+/ },
        website: { type: String, match: /^https?:\/\/.+/ },
        support: { type: String, match: /^https?:\/\/(discord\.gg|discordapp\.com\/invite)\/.+/ },
        webhook: { type: String, match: /^https?:\/\/.+/ }
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

// Indexes
BotSchema.index({ 'profile.username': 'text', 'profile.shortDescription': 'text' });

// Virtual for average rating
BotSchema.virtual('averageRating').get(function() {
    const ratings = Array.from(this.ratings.values());
    return ratings.length ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
});

// Middleware: Update lastModified before save
BotSchema.pre('save', function(next) {
    this.lastModified = new Date();
    next();
});

module.exports = mongoose.model('Bot', BotSchema);