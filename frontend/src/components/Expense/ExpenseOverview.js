import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

import '../../styles/ExpenseOverview.css'

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {}
  }, [transactions]);

  return (
<div className="expense-overview-wrapper">
  <div className="expense-overview-header">
    <div className="expense-overview-text">
      <h5 className="heading">Expense Overview</h5>
      <p className="expense-overview-para">Track your earnings over time and analyze your Expense</p>
    </div>

    <button className="add-btn" onClick={onAddExpense}>
      <LuPlus className='add-icon' />
      Add Expense
    </button>
  </div>
  <div className="expense-overview-chart">
    <CustomLineChart data={chartData} />
  </div>
</div>
  );
};

export default ExpenseOverview;
