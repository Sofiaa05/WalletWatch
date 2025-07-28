import React from 'react';
import '../../styles/CustomToolTip.css'; // Import the CSS file

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className='custom-tooltip'>
        <p className='tooltip-title'>{item.category || item.source || item.name || item.label}</p>
        <p className='tooltip-amount'>
          Amount: <span className='tooltip-value'>₹{item.amount || payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
