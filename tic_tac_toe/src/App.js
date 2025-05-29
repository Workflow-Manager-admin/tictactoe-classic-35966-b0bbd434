import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  /**
   * App component - main integration layer for TicTacToe Classic.
   * Replaces template UI with the real game container.
   */
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            {/* App title in nav or placeholder for navigation buttons */}
            <span style={{ color: '#1976d2', fontWeight: 'bold', marginLeft: 12 }}>TicTacToe</span>
          </div>
        </div>
      </nav>

      <main>
        {/* Center the main container with sufficient top margin for nav */}
        <div style={{ marginTop: 96 }}></div>
        <TicTacToe />
      </main>
    </div>
  );
}

export default App;