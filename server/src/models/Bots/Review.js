const ReviewSchema = new Schema({
    botId: { 
        type: String, 
        required: true, 
        ref: 'Bot' 
    },
    userId: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true,
        maxlength: [1000, 'Review content cannot exceed 1000 characters']
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    approved: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Review', ReviewSchema);