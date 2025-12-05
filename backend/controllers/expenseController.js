const Expense = require("../models/Expense");
const xlsx = require("xlsx");
const { generateSpendingInsights } = require("../services/openaiService");

exports.addExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = await Expense.create({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        // check for budget breach
        await checkBudgetBreach(userId, date);

        return res.status(200).json({
            message: "Expense added successfully",
            expense: newExpense
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find( {userId} ).sort({date: -1});
        res.status(200).json(expense);
    }catch (error){
        res.status(500).json({message: "server error", error: error.message});
    }
}

exports.deleteExpense = async (req, res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if (!expense){
            return res.status(400).json({messge: "Expense source not found"});
        }

        if(expense.userId.toString() !== req.user.id){
            return res.status(401).json({message: "Not authorized to delete this expense source"})
        }

        await expense.deleteOne();
        res.status(200).json({message: "Expense source deleted successfully"});
    }catch (error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, 'expense_details.xlsx');
    res.download('expense_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Generate AI financial summary
exports.getSpendingInsights = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId });

    if (!expenses.length) {
      return res.status(400).json({ message: "No expenses found" });
    }

    const insights = await generateSpendingInsights(expenses);
    res.status(200).json({ insights });

  } catch (error) {
    res.status(500).json({ message: "AI analysis failed", error: error.message });
  }
};