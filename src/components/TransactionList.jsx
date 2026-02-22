import React from 'react';

/**
 * TransactionList Component
 * Displays list of all transactions with delete functionality
 * @param {Array} transactions - Filtered list of transactions to display
 * @param {Function} onDeleteTransaction - Callback function to delete transaction
 */
function TransactionList({ transactions, onDeleteTransaction }) {
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="transaction-list-container">
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions found</p>
      ) : (
        <div className="transaction-list">
          {transactions.map(transaction => (
            <div
              key={transaction.id}
              className={`transaction-item ${transaction.category.toLowerCase()}`}
            >
              <div className="transaction-info">
                <div className="transaction-header">
                  <h4>{transaction.title}</h4>
                  <span className={`category-badge ${transaction.category.toLowerCase()}`}>
                    {transaction.category}
                  </span>
                </div>
                <p className="transaction-date">{formatDate(transaction.date)}</p>
              </div>
              <div className="transaction-actions">
                <span className={`amount ${transaction.category.toLowerCase()}`}>
                  {transaction.category === 'Income' ? '+' : '-'}${transaction.amount}
                </span>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="delete-btn"
                  aria-label="Delete transaction"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TransactionList;
