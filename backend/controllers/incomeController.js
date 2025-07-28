const Income = require("../models/Income.js");
const xlsx = require("xlsx");

exports.addIncome = async (req, res) => {
    const userId = req.user.id; // Get the authenticated user's ID from the request
    try{
        const {icon, source, amount, date} = req.body || {};

        // Validation: check if all fields are provided
        if (!source || !amount || !date){
            return res.status(400).json({message: "All fields are required"});
        }

        const newIncome = await Income.create({
            userId,
            source,
            icon,
            amount,
            date: new Date(date) // Ensure date is stored as a Date object
        })

        res.status(200).json({message: "Income source added successfully", income: newIncome});
    }catch (err) {
        res.status(500).json({message: "server error", error: err.message});
    }
} 


// Get all income records for the authenticated user
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1}); //Model.find({ key: value }) => { userId: userId }
        res.json(income);
    } catch (err) {
        res.status(500).json({message: "server error", error: err.message});
    }
};

//Delete income source
exports.deleteIncome = async (req, res) => {
    try{
        const income = await Income.findById(req.params.id);

        if(!income) {
            return res.status(404).json({message: "Income source not found"});
        }

        // Check if the income belongs to the authenticated user
        if (income.userId.toString() !== req.user.id) {
            return res.status(403).json({message: "Not authorized to delete this income source"});
        }

        await income.deleteOne(); //or await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Income source deleted successfully"});
    }catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download('income_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};