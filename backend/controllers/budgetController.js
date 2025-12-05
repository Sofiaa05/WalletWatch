const Budget = require("../models/Budget");
const Expense = require("../models/Expense");
const User = require("../models/User");
const { sendBudgetAlertEmail } = require("../services/emailServices");

// set monthly budget
exports.setBudget = async (req, res) => {
    try {
        const userId = req.user.id;
        const { monthlyBudget } = req.body;

        const month = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;

        let budget = await Budget.findOne({ userId, month });

        if (budget) {
            budget.monthlyBudget = monthlyBudget;
            await budget.save();
        } else {
            budget = await Budget.create({ userId, monthlyBudget, month });
        }

        return res.status(200).json({
            message: "Monthly budget set successfully",
            budget
        });
    } catch (error) {
        console.error("Budget Set Error:", error);
        return res.status(500).json({ message: "Error setting budget", error: error.message });
    }
};


// checking budget breach if expense exceed budger
exports.checkBudgetBreach = async (userId, expenseDate) => {
    const month = `${new Date(expenseDate).getFullYear()}-${new Date(expenseDate).getMonth() + 1}`;
    const budget = await Budget.findOne({ userId, month });

    if (!budget) return;

    const spentAgg = await Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalSpent = spentAgg[0]?.total || 0;

    if (totalSpent > budget.monthlyBudget) {
        const user = await User.findById(userId);

        await sendBudgetAlertEmail(
            user.email,
            user.fullname || "User",
            totalSpent,
            budget.monthlyBudget
        );
    }
};
