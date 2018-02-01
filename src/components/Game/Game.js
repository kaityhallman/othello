import React, { Component } from 'react';
import styled from 'styled-components';
import Board from '../Board';

const BoardGame = styled.div`
  display: flex;
  flex-direction: row;
`;

class Game extends Component {
  constructor() {
    super();

    // set up board
    const squares = Array(64).fill(null);

    // set up initial pieces
    squares[27] = squares[36] = 'red';
    squares[28] = squares[35] = 'blue';

    this.state = {
      squares,
      blueIsNext: true, // blue player always goes first
      stepNumber: 0, // how many turns there have been
    }
  }

  handleClick = (i) => {
    const squares = this.state.squares.slice();

    if (this.state.stepNumber >= 60 || squares[i]) return;

    const convertPiece = this.convertPiece(i);

    if (convertPiece.length === 0) return;

    const current = this.state.blueIsNext ? 'blue' : 'red';

    convertPiece.forEach((square) => {
      squares[square] = current;
    });

    squares[i] = current;

    this.setState((prevState) => {
      this.setState({
        squares,
        stepNumber: prevState.stepNumber + 1,
        blueIsNext: !prevState.blueIsNext,
      });
    });
  }

  convertPiece = (i) => {
    console.log('wololo', i)
    let convertPiece = Array(0);
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        if (x !== 0 || y !== 0) {
          convertPiece = convertPiece.concat(this.convertPieceLine(i, x, y));
        }
      }
    }
    return convertPiece;
  }

  convertPieceLine = (i, xStep, yStep) => {
    const squares = this.state.squares.slice();
    const convertPiece = [];
    let found = false;
    const curr = this.state.blueIsNext ? 'blue' : 'red';
    let x = getX(i) + xStep, y = getY(i) + yStep;

    while (!found && x >= 0 && x < 8 && y >= 0 && y < 8) {
      if (!squares[getId(x, y)]) {
        return [];
      } else if (squares[getId(x, y)] === curr) {
        found = true;
      } else {
        convertPiece.push(getId(x, y));

        x += xStep;
        y += yStep;
      }
    }

    if (found)
      return convertPiece;
    return [];
  }

  render() {
    const squares = this.state.squares;

    return (
      <BoardGame>
        <div className="game-board">
          <Board squares={squares} onClick={(i) => this.handleClick(i)} />
        </div>
      </BoardGame>
    );
  }
}

function getX(i) {
  return i % 8;
}

function getY(i) {
  return parseInt(i / 8, 10);
}

function getId(x, y) {
  return y * 8 * x;
}

export default Game;
