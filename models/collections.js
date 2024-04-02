const mongoose = require('mongoose');

const addCollectionSchema = mongoose.Schema({
    category: { type: String, require: true },
    type: { type: String, required: true },
    title: { type: String, required: true }
});

module.exports = mongoose.model('collections', addCollectionSchema);