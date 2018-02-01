import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Cell,
} from './style';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
      row: 0,
      cell: 0,
      cellInitialized: false,
      tableRow: [],
    };
  }

  componentWillMount() {
    this.init();
  }

  init = () => {
    let row;
    let cell;
    let tableRow;
    let cellInitialized;
    const board = [];
    const columns = [];
    const rows = [];

    const { playerRed, playerBlue, playerNone, maxCols, maxRows } = this.props;

    for (row = 0; row < maxRows; row += 1) {
      tableRow = [];
      for (cell = 0; cell < maxCols; cell += 1) {
        cellInitialized = false;
        if (row === 3) {
          if (cell === 3) {
            tableRow.push(playerRed);
            cellInitialized = true;
          } else if (cell === 4) {
            tableRow.push(playerBlue);
            cellInitialized = true;
          }
        } else if (row === 4) {
          if (cell === 3) {
            tableRow.push(playerBlue);
            cellInitialized = true;
          } else if (cell === 4) {
            tableRow.push(playerRed);
            cellInitialized = true;
          }
        }

        if (!cellInitialized) {
          tableRow.push(playerNone)
        }

        columns.push(tableRow[0][cell])
      }

      board.push(tableRow);
      rows.push(tableRow[0]);
    }

    this.getRows(rows, columns);
    this.setState({ board });
  }

  cellClicked = (event) => {
    const cellId = event.currentTarget.id;
  }

  getColumns = (columns) => {
    for (let i = 0; i < columns.length; i++) {
      columns.push(<Cell key={`column-${i}`} id={`column-${i}`}>{i}</Cell>)
    }

    this.setState({ columns });
  }

  getRows = (rows, columns) => {
    console.log('columns', columns);
    // for (let i = 0; i < rows.length; i++) {
    //   rows.push(<tr key={`row-${i}`} className="row" id={`row-${i}`}>{this.getColumns(columns)}</tr>);
    // }

    this.setState({ rows });
  }

  render() {
    return (
      <table className="board">
        <tbody>
          {this.state.rows}
        </tbody>
      </table>
    );
  }
}

export default Table;
