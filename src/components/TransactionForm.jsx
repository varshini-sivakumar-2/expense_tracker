import React, { useState } from 'react';

/**
 * TransactionForm Component
 * Form to add new transactions with validation
 * @param {Function} onAddTransaction - Callback function to add transaction
 */
function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Income',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Check if title is empty
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    // Check if amount is empty
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      // Check if amount is a valid positive number
      newErrors.amount = 'Amount must be a positive number';
    }

    // Check if date is empty
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Create new transaction object
    const newTransaction = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      amount: parseFloat(formData.amount).toFixed(2),
      category: formData.category,
      date: formData.date
    };

    // Add transaction
    onAddTransaction(newTransaction);

    // Reset form
    setFormData({
      title: '',
      amount: '',
      category: 'Income',
      date: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };

  return (
    <div className="form-container">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter transaction title"
            className={errors.title ? 'error-input' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            step="0.01"
            className={errors.amount ? 'error-input' : ''}
          />
          {errors.amount && <span className="error-message">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'error-input' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
