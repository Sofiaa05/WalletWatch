import React from 'react';
import { LuTrendingUpDown } from 'react-icons/lu';
import '../../components/layouts/AuthLayout.css';
import  logo  from '../../assets/images/logo.png';
import card from '../../assets/images/card.png'

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className={`stats-info-card ${color}`}>
      <div className="stats-icon">
        {icon}
      </div>
      <div className="stats-details">
        <h6 className="stats-label">{label}</h6>
        <span className="stats-value">{value}</span>
      </div>
    </div>
  );
}
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <img src={logo} alt="wallet watch icon" className='logo' />
        {children}
      </div>

      <div className="auth-image">
        <StatsInfoCard
          icon={<LuTrendingUpDown />}    
          label="Track Your Wallet"
          value="₹4300000"
          color="bg-primary"
        />
        <img 
          src={card}
          alt="Wallet Watch"
          className="auth-image-card"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

