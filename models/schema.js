const mongoose = require("mongoose")

const pasteSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    }, 
    description: String,
    pastedText: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Schema', pasteSchema);