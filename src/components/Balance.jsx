import React from 'react';

/**
 * Balance Component
 * Displays total balance, total income, and total expenses
 * @param {Array} transactions - List of all transactions
 */
function Balance({ transactions }) {
  // Calculate total income using reduce
  const totalIncome = transactions
    .filter(transaction => transaction.category === 'Income')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  // Calculate total expenses using reduce
  const totalExpenses = transactions
    .filter(transaction => transaction.category === 'Expense')
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  // Calculate total balance
  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="balance-container">
      <div className="balance-card total-balance">
        <h3>Total Balance</h3>
        <p className={totalBalance >= 0 ? 'positive' : 'negative'}>
          ${totalBalance.toFixed(2)}
        </p>
      </div>
      <div className="balance-card income">
        <h3>Total Income</h3>
        <p className="positive">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="balance-card expense">
        <h3>Total Expenses</h3>
        <p className="negative">${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Balance;
