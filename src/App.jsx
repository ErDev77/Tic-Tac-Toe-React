import React, { useState } from 'react';
import './App.css';

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
};

const Game = () => {
  const [state, setState] = useState(initialState);
  const [winner, setWinner] = useState(null);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const handleClick = (i) => {
    const squares = state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
    });

    const gameWinner = calculateWinner(squares);
    if(gameWinner) {
      setWinner(gameWinner);
      gameWinner === 'X' ? setScoreX(scoreX + 1) : setScoreO(scoreO + 1);
    }
  };

  const handleReset = () => {
    setState(initialState);
    setWinner(null);
  };

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!state.squares.includes(null)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-board">
        <div className="score">
        <h2>Score:</h2>
        <p>X: {scoreX}</p>
        <p>O: {scoreO}</p>
      </div>
        <Board squares={state.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        {(winner || !state.squares.includes(null)) && (
          <button className="play-again" onClick={handleReset}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;