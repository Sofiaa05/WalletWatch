import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';
import '../../styles/IncomeOverview.css'

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {}
  }, [transactions]);

  return (
<div className="income-overview-wrapper">
  <div className="income-overview-header">
    <div className="income-overview-text">
      <h5 className='heading'>Income Overview</h5>
      <p className='income-overview-para'>Track your earnings over time and analyze your income</p>
    </div>

    <button className="add-btn" onClick={onAddIncome}>
      <LuPlus className='add-icon' />
      Add Income
    </button>
  </div>

  <div className="income-overview-chart">
    <CustomBarChart data={chartData} />
  </div>
</div>
  );
};

export default IncomeOverview;
