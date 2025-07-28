import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import '../../styles/RecentTransactions.css';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight />
        </button>
      </div>

      <div className='t-card'>
        {transactions?.slice(0,5)?.map((item) => (
            <TransactionInfoCard 
                key={item._id}
                title={item.type === 'expense' ? item.category : item.source}
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type={item.type}
                hideDeleteBtn
            />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
