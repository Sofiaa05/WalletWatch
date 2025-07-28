import React from 'react'
import { useState, useEffect } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
const COLORS = ["#ec4899", "#b5c91fe6", "#3b82f6", "#5c8b09ff"];

const RecentIncomeWithChart = ({data, totalIncome}) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data.map((item) => ({
            name: item?.source,
            amount: item?.amount
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
        return () => {};
    }, [data]);


  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  };

  const titleStyle = {
    fontSize: '1.125rem', // text-lg
    fontWeight: 600,
    color: '#111827' // gray-900
  };

  return (
    <div className='card'>
      <div style={headerStyle}>
        <h5 style={titleStyle}>Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
}

export default RecentIncomeWithChart
