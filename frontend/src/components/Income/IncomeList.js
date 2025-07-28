import React from 'react'
import { LuDownload } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import '../../styles/IncomeList.css'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='income-card'>
      <div className="income-card-header">
        <h5>Income Sources</h5>
        <button className="income-card-btn" onClick={onDownload}>
            <LuDownload /> Download
        </button>
      </div>

        <div className='income-t-card'>
        {transactions?.map((income) => (
            <TransactionInfoCard 
                key={income._id}
                title={income.source}
                icon={income.icon}
                date={moment(income.date).format("Do MMM YYYY")}
                amount={income.amount}
                type="income"
                onDelete={() => onDelete(income._id)}
            />
        ))}
      </div>
    </div>
  )
}
export default IncomeList
