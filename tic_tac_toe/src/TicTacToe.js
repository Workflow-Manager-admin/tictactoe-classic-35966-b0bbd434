import React, { useState } from 'react';

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * Main container for TicTacToe Classic.
   * Implements two-player mode, win/draw detection,
   * restart capability, and a responsive/grid-based layout.
   * The component uses the provided light color theme.
   */

  // Game state: Array of 9 cells for 3x3 grid
  const [board, setBoard] = useState(Array(9).fill(null));
  // Current player: 'X' or 'O'
  const [xIsNext, setXIsNext] = useState(true);
  // Tracks "X", "O", "draw", or null for ongoing
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);

  // Handler: When a cell is clicked
  // No move allowed if someone has won or cell occupied
  // Otherwise, update cell and switch player
  const handleCellClick = idx => {
    if (winner || board[idx]) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  };

  // Handler: Restart the game
  // Resets board and turn
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Theme colors
  const theme = {
    primary: '#1976d2',        // blue
    secondary: '#ffffff',      // white
    accent:    '#ff9800',      // orange
    light:     '#f4f6fa'
  };

  // Status text
  let statusMsg;
  if (winner) {
    statusMsg = `Player ${winner} wins!`;
  } else if (isDraw) {
    statusMsg = "It's a draw!";
  } else {
    statusMsg = `Player ${xIsNext ? 'X' : 'O'}'s turn`;
  }

  // Inline styles for simplicity and theme
  const styles = {
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: theme.light,
      fontFamily: "'Inter','Roboto','Arial',sans-serif",
    },
    title: {
      fontSize: "2.4rem",
      fontWeight: 700,
      marginBottom: 24,
      color: theme.primary,
    },
    status: {
      fontSize: "1.2rem",
      fontWeight: 500,
      marginBottom: 24,
      marginTop: 8,
      color: winner
        ? theme.accent
        : isDraw
        ? "#bdbdbd"
        : theme.primary,
      minHeight: "28px",
      letterSpacing: "0.1em",
      textAlign: "center",
      transition: "color 0.3s"
    },
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 72px)",
      gridTemplateRows: "repeat(3, 72px)",
      gap: "8px",
      background: "#e3eaf3",
      borderRadius: 16,
      boxShadow: "0 4px 20px rgba(25,118,210,.1)",
      marginBottom: 24,
      justifyContent: "center",
      alignItems: "center",
      width: "max-content"
    },
    cell: idx => ({
      width: 72,
      height: 72,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: theme.secondary,
      border: `2px solid ${theme.primary}`,
      borderRadius: 8,
      fontSize: "2.5rem",
      fontWeight: 700,
      color:
        board[idx] === 'X'
          ? theme.primary
          : board[idx] === 'O'
          ? theme.accent
          : theme.primary,
      cursor: board[idx] || winner ? "default" : "pointer",
      boxShadow:
        (winner && isWinningSquare(idx, board))
          ? `0 0 10px 2px ${theme.accent}70`
          : "none",
      transition: "background 0.2s, box-shadow 0.2s, color 0.1s",
      userSelect: "none"
    }),
    restartBtn: {
      background: theme.accent,
      color: theme.secondary,
      border: "none",
      fontSize: "1.02rem",
      fontWeight: 600,
      padding: "10px 24px",
      marginTop: 8,
      borderRadius: 6,
      cursor: "pointer",
      letterSpacing: "0.03em",
      boxShadow: "0 2px 6px rgba(25,118,210,.09)",
      transition: 'background 0.2s, color 0.15s',
      outline: "none"
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.title}>Tic Tac Toe Classic</div>
      <div style={styles.status}>{statusMsg}</div>
      <div style={styles.board}>
        {board.map((cell, idx) => (
          <button
            key={idx}
            style={styles.cell(idx)}
            onClick={() => handleCellClick(idx)}
            aria-label={`cell ${idx + 1}`}
            disabled={!!winner || !!cell}
          >
            {cell}
          </button>
        ))}
      </div>
      <button type="button" style={styles.restartBtn} onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

// Helper: Determines winner (X/O), or null if no winner yet
// PUBLIC_INTERFACE
function calculateWinner(board) {
  /**
   * Given 9-cell board array, determines if there's a winner.
   * Returns "X", "O", or null.
   */
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diags
  ];
  for (let [a, b, c] of lines) {
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

// Helper: Checks if idx is in the current win line
function isWinningSquare(idx, board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c] &&
      (a === idx || b === idx || c === idx)
    ) {
      return true;
    }
  }
  return false;
}

export default TicTacToe;
