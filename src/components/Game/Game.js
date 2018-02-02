import React, { Component } from 'react';
import Board from '../Board';

class Game extends Component {
  constructor() {
    super();

    // set up our 8x8 array
    const squares = Array(64).fill(null);

    // set up initial squares in center of board
    squares[27] = squares[36] = 'blue';
    squares[28] = squares[35] = 'red';

    this.state = {
      squares: squares,
      blueIsNext: true, // player blue goes first!
      stepNumber: 0, // count how many plays
    };
  }

  handleClick = (i) => {
    const squares = this.state.squares.slice();

    // if we have no more squares to click, exit out.
    if (this.state.stepNumber >= 60 || squares[i])
      return;

    const convertedPiece = this.convertPiece(i);
    if (convertedPiece.length === 0)
      return;

      // give square a color value
    const current = this.state.blueIsNext ? 'blue' : 'red';

    convertedPiece.forEach((square) => {
      squares[square] = current;
    });

    squares[i] = current;

    this.setState({
      squares,
      stepNumber: this.state.stepNumber + 1,
      blueIsNext: !this.state.blueIsNext,
    });
  }

  convertPiece = (i) => {
    let convertedPiece = Array(0);
    for (let x = -1; x < 2; x++){
      for (let y = -1; y < 2; y++){
        if (x !== 0 || y !== 0){
          convertedPiece = convertedPiece.concat(this.createLine(i, x, y));
        }
      }
    }
    return convertedPiece;
  }

  createLine = (i, xStep, yStep) => {
    const squares = this.state.squares.slice();
    let convertedPiece = [];
    let found = false;
    const current = this.state.blueIsNext ? 'blue' : 'red';
    let x = getX(i) + xStep, y = getY(i) + yStep;

    while (!found && x >= 0 && x < 8 && y >= 0 && y < 8) {
      if (!squares[getId(x,y)]) {
        return [];
      } else if (squares[getId(x,y)] === current) {
        found = true;
      }
      else {
        convertedPiece.push(getId(x,y));
        x += xStep;
        y += yStep;
      }
    }

    if (found)
      return convertedPiece;
    return [];
  }

  passTurn = () => {
    // no passes if game is over
    if (this.state.stepNumber > 59)
      return;
    // set up next turn
    this.setState({ blueIsNext: !this.state.blueIsNext });
  }

  giveUp = () => {
    // can't give up if game is over
    if (this.state.stepNumber > 59)
      return;

    const squares = this.state.squares.slice();
    const fillWith = this.state.blueIsNext ? 'red' : 'blue';

    for (let i = 0; i < 64; i++)
      if (squares[i] === null)
        // make all squares the color of the winner! mua ha ha
        squares[i] = fillWith;

    this.setState({ squares: squares, stepNumber: 60 });
  }

  render() {
    const squares = this.state.squares;
    const score = calculateScore(this.state.squares);
    const winner = calculateWinner(score);
    const displayScore = 'Blue: ' + score.blue + ' | Red: ' + score.red;
    let status;

    if (winner) {
      status = <h1>Winner : { winner }</h1>
    } else {
      status = 'Next player: ' + (this.state.blueIsNext ? 'blue' : 'red');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{displayScore}</div>
          <div>{status}</div>
          <button onClick={() => this.passTurn()}>Pass</button>
          <button onClick={() => this.giveUp()}>Give up</button>
        </div>
      </div>
    );
  }
}

function getX(i){
  return i % 8;
}

function getY(i){
  return parseInt(i / 8, 10);
}

function getId(x, y){
  return y * 8 + x;
}

function calculateWinner(score) {
  // if total score of both players is 64
  if (score.blue + score.red === 64) {
    // if blue is greater than red, blue wins. else red wins.
    return score.blue > score.red ? 'blue' : 'red';
  }
  return null;
}

function calculateScore(squares){
  let blue = 0;
  let red = 0;

  squares.forEach((square) => {
    // if square gets assigned a blue color, then blue gets points
    if (square === 'blue') {
      blue++;
    } else if (square === 'red') {
      // otherwise, red gets points
      red++;
    }
  });
  return { blue, red };
}

export default Game;
