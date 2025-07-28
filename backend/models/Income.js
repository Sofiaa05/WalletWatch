const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
    userId: {
        //Mongoose equivalent of a foreign key in relational databases like MySQL or PostgreSQL
        //This is a reference to the User model, which allows us to associate income records with a specific user.
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    icon: {
        type: String,
    },
    source: {  //example: Salary, Freelance, Investments
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }, 
}, {timestamps: true});

module.exports = mongoose.model("income", incomeSchema);