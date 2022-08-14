const mongoose = require("mongoose")

const pasteSchema = new mongoose.Schema({
    pastedText: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("paste", pasteSchema);