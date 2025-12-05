const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    monthlyBudget: { 
        type: Number, 
        required: true 
    },
    month: { 
        type: String, 
        required: true 
    }, // "2025-12"
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Budget", budgetSchema);
