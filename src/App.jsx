import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';

/**
 * Main App Component
 * Manages application state and LocalStorage operations
 */
function App() {
  // State for storing all transactions
  const [transactions, setTransactions] = useState([]);

  // State for filtering transactions
  const [filter, setFilter] = useState('All');

  // LocalStorage key
  const STORAGE_KEY = 'expenseTrackerTransactions';

  /**
   * Load transactions from LocalStorage on component mount
   */
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem(STORAGE_KEY);
        if (storedTransactions) {
          const parsedTransactions = JSON.parse(storedTransactions);
          setTransactions(parsedTransactions);
        }
      } catch (error) {
        console.error('Error loading transactions from LocalStorage:', error);
      }
    };

    loadTransactions();
  }, []);

  /**
   * Save transactions to LocalStorage whenever transactions change
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions to LocalStorage:', error);
    }
  }, [transactions]);

  /**
   * Add new transaction
   * @param {Object} transaction - New transaction object
   */
  const handleAddTransaction = (transaction) => {
    setTransactions(prevTransactions => [transaction, ...prevTransactions]);
  };

  /**
   * Delete transaction by id
   * @param {string} id - Transaction id to delete
   */
  const handleDeleteTransaction = (id) => {
    setTransactions(prevTransactions =>
      prevTransactions.filter(transaction => transaction.id !== id)
    );
  };

  /**
   * Handle filter change
   * @param {string} newFilter - Filter value (All, Income, or Expense)
   */
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  /**
   * Get filtered transactions based on current filter
   * @returns {Array} Filtered transactions
   */
  const getFilteredTransactions = () => {
    if (filter === 'All') {
      return transactions;
    }
    return transactions.filter(transaction => transaction.category === filter);
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="container">
          {/* Balance Section */}
          <Balance transactions={transactions} />

          {/* Two Column Layout */}
          <div className="content-grid">
            {/* Left Column - Form */}
            <div className="left-column">
              <TransactionForm onAddTransaction={handleAddTransaction} />
            </div>

            {/* Right Column - Summary */}
            <div className="right-column">
              <Summary
                onFilterChange={handleFilterChange}
                transactions={transactions}
              />
            </div>
          </div>

          {/* Transaction List - Full Width */}
          <TransactionList
            transactions={filteredTransactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
