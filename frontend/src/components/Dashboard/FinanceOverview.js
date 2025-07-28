import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import '../../styles/FinanceOverview.css';

const COLORS = ["#ec4899", "#b5c91fe6", "#3b82f6"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense }
  ];

  return (
    <div className="card">
      <div className="finance-overview-header">
        <h5 className="finance-overview-title">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
