const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

//middleware
app.use(express.json()); // Middleware to parse JSON body
app.use(cors());

require("dotenv").config();

const db = require("./db/db.js");
const authRoutes = require("./routes/authRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const expenseRoutes = require("./routes/expenseRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const historyRoutes = require("./routes/historyRoutes.js");

const port = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/api/v1/auth", authRoutes); // Register auth routes
app.use("/api/v1/income", incomeRoutes); //Register income routes
app.use("/api/v1/expense", expenseRoutes); //Register expense routes
app.use("/api/v1/dashboard", dashboardRoutes); //Register dashboard routes
app.use("/api/v1/history", historyRoutes); 

//server uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const server = () => {
    db(); // Connect to database
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

server();
