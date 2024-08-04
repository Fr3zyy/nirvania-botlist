const DenySchema = new Schema({
    botId: { 
        type: String, 
        required: true, 
        ref: 'Bot' 
    },
    reviewerId: { 
        type: String, 
        required: true 
    },
    reason: { 
        type: String, 
        required: true,
        maxlength: [500, 'Deny reason cannot exceed 500 characters']
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Deny', DenySchema);