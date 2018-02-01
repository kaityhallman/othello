import React, { Component } from 'react';
import Square from '../Square';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBlue: true, // playerBlue always goes first
      // this sets up an empty board
      // '+' is an empty square. 'b' is blue player. 'r' is red player.
      grid: Array(8).fill().map(x => Array(8).fill('+')),
      currentPlayer: 'blue',
    }
  }

  handleClick = (index, j) => {
    // only add a piece and check for winner if the clicked square is empty.
    if (this.state.grid[index][j] === '+')  {
      // don't mutate state directly
      const grid = this.state.grid;

      // set the grid square corresponding to the clicked square to the color of the current player.
      grid[index][j] = this.state.isBlue === true ? 'b' : 'r';

      // set the currentPlayer to the next color so on click, it will update whose turn it is
      const currentPlayer = this.state.isBlue ? 'red' : 'blue';
      
      // set the state with new grid data.
      this.setState({ grid, isBlue: !this.state.isBlue, currentPlayer });
    }
  }

  render() {
    // styles for table element
    const style = {
      textAlign: 'center',
      margin: 'auto',
      height: '500px',
      width: '500px',
      tableLayout: 'fixed',
    }

    const grid = this.state.grid;

    // loop through squares in each row and generate a new square component.
    // pass props into square.
    const board = grid.map((row, index) => { return (
      <tr key={`row-${index}`}>
        {row.map((column, j) => {
          // set the color based on active (player red or blue) or inactive state
          const color = grid[index][j] === '+' ? 'white' : grid[index][j] === 'b' ? 'blue' : 'red';
          return (
            <Square
              handleClick={() => this.handleClick(index, j)}
              color={color}
              key={`${index}-${j}`}
            />
          )
        })}
      </tr>
    )})

    return (
      <div>
        <table style={style}>
          <tbody>
            {board}
          </tbody>
        </table>
        <div>Current player: <span
            style={{ color: this.state.currentPlayer }}
          >
            {this.state.currentPlayer}
          </span>
        </div>
      </div>
    )
  }
}
