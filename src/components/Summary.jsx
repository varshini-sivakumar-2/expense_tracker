import React, { useState } from 'react';

/**
 * Summary Component
 * Provides filtering options and displays monthly summary
 * @param {Function} onFilterChange - Callback function when filter changes
 * @param {Array} transactions - All transactions for monthly summary
 */
function Summary({ onFilterChange, transactions }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Filter transactions for current month
  const currentMonthTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Calculate monthly totals using reduce
  const monthlyIncome = currentMonthTransactions
    .filter(t => t.category === 'Income')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const monthlyExpenses = currentMonthTransactions
    .filter(t => t.category === 'Expense')
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const monthlySavings = monthlyIncome - monthlyExpenses;

  return (
    <div className="summary-container">
      {/* Filter Section */}
      <div className="filter-section">
        <h3>Filter Transactions</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
            onClick={() => handleFilterChange('All')}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeFilter === 'Income' ? 'active' : ''}`}
            onClick={() => handleFilterChange('Income')}
          >
            Income
          </button>
          <button
            className={`filter-btn ${activeFilter === 'Expense' ? 'active' : ''}`}
            onClick={() => handleFilterChange('Expense')}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Monthly Summary Section */}
      <div className="monthly-summary">
        <h3>Monthly Summary - {currentMonth}</h3>
        <div className="summary-stats">
          <div className="summary-stat">
            <span className="stat-label">Income:</span>
            <span className="stat-value income">${monthlyIncome.toFixed(2)}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Expenses:</span>
            <span className="stat-value expense">${monthlyExpenses.toFixed(2)}</span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Savings:</span>
            <span className={`stat-value ${monthlySavings >= 0 ? 'income' : 'expense'}`}>
              ${monthlySavings.toFixed(2)}
            </span>
          </div>
          <div className="summary-stat">
            <span className="stat-label">Transactions:</span>
            <span className="stat-value">{currentMonthTransactions.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
