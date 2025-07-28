import React from 'react';
import '../../styles/InfoCard.css'; // Make sure this file exists

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="info-card">
      <div className="info-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="info-details">
        <h6 className="info-label">{label}</h6>
        <span className="info-value">₹{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
