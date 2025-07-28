import React from 'react'
import { LuDownload } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import '../../styles/ExpenseList.css'

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='expense-card'>
      <div className="expense-card-header">
        <h5>All Expenses</h5>
        <button className="expense-card-btn" onClick={onDownload}>
            <LuDownload /> Download
        </button>
      </div>

        <div className='expense-t-card'>
        {transactions?.map((expense) => (
            <TransactionInfoCard 
                key={expense._id}
                title={expense.category}
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")}
                amount={expense.amount}
                type="expense"
                onDelete={() => onDelete(expense._id)}
            />
        ))}
      </div>
    </div>
  )
}
export default ExpenseList
