const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.getHistory = async (req, res) => {
    const userId = req.user.id; // Get the authenticated user's ID from the request
    try{
        //get all incomes
        const incomes = await Income.find({userId});
        const expenses = await Expense.find({userId});

        //adding type field to each income item
        const incomesWithType = incomes.map((income) => {
            const plainIncome = income.toObject(); // convert to plain JS object
            plainIncome.type = 'income';
            return plainIncome;
        });

        const expensesWithType = expenses.map((expense) => {
            const plainExpense = expense.toObject();
            plainExpense.type = 'expense';
            return plainExpense;
        });    

        //combine income and expense into one single array
        const history = incomesWithType.concat(expensesWithType);

        //sort the combined array by date (newest first)
        //new Date() -> converts a string to date
        //b.date - a.date -> sorts fromt newest to oldest
        history.sort((a,b) => new Date(b.date) - new Date(a.date))

        //send response
        res.status(200).json(history);
    }catch (error){
        res.status(500).json({message: "server error", error: error.message});
    }
}