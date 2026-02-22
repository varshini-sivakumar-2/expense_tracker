import React from 'react';

/**
 * Header Component
 * Displays the application title and description
 */
function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Expense Tracker</h1>
        <p>Track your income and expenses effortlessly</p>
      </div>
    </header>
  );
}

export default Header;
