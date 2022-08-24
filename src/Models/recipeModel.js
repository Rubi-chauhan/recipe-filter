const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    id: { type: String, required: true,trim: true},
    ingredients: [{
        quantity: { type: String, required: true,trim: true},
        name: { type: String, trim: true },
        type: { type: String, trim: true }
    }],
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('recipe', recipeSchema)
