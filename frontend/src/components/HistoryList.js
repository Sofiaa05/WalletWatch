import moment from 'moment';
import TransactionInfoCard from '../components/Cards/TransactionInfoCard';

const HistoryList = ({transactions}) => {

  return (
    <div className='income-card'>
      <div className="income-card-header">
        <h5>All Transactions</h5>
      </div>

        <div className='income-t-card'>
        {transactions?.map((history) => (
            <TransactionInfoCard 
                key={history._id}
                title={history.source || history.category}
                icon={history.icon}
                date={moment(history.date).format("Do MMM YYYY")}
                amount={history.amount}
                type={history.type}
                hideDeleteBtn={true}
            />
        ))}
      </div>
    </div>
  )
}

export default HistoryList

 