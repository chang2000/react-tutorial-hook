import React, { useState } from "react"
import Board from "./Board"
function calculateWinner(squares) {
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
}
const Game = () => {

  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(history[stepNumber].squares)
  const nextPlayer = xIsNext ? "X" : "O"


  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  const handleClick = (i) => {
    console.log('into clickfunction')
    const historyCopy = history.slice(0, stepNumber + 1)
    const current = historyCopy[historyCopy.length - 1]
    let squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O'
    setHistory(history.concat([{
      squares: squares
    }]))
    setXIsNext(!xIsNext)
    setStepNumber(historyCopy.length)
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{winner ? "Winner: " + winner : "Next Player: " + nextPlayer}</div>
        <div>
          <p>History</p>
          {renderMoves()}
        </div>
      </div>
    </div>
  )
}

export default Game