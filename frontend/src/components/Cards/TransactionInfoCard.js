import React from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2
} from 'react-icons/lu';
import '../../styles/TransactionInfoCard.css';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete
}) => {
  return (
    <div className="transaction-card">
      <div className="icon-container">
        {icon ? (
          <img src={icon} alt={title} className="icon-img" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="transaction-details">
        <div>
          <p className="title">{title}</p>
          <p className="date">{date}</p>
        </div>

        <div className="amount-actions">
          {!hideDeleteBtn && (
            <button
              className="delete-btn"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}
          <div className={`amount-box ${type === 'income' ? 'income' : 'expense'}`}>
            <h6 className="amount">
              {type === 'income' ? '+' : '-'} ₹{amount}
            </h6>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
