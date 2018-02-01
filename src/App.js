import React, { Component } from 'react';
import Table from './components/Table';
import style from './style';

class App extends Component {
  constructor() {
    super();

    this.state = {
      playerRed: 1,
      playerBlue: -1,
      playerNone: 0,
      currentPlayer: 'player-red',
      maxRows: 8,
      maxCols: 8,
    };
  }

  render() {
    const { playerRed, playerBlue, playerNone, maxRows, maxCols } = this.state;
    return (
      <main className="main">
        <Table
          playerRed={playerRed}
          playerBlue={playerBlue}
          playerNone={playerNone}
          maxRows={maxRows}
          maxCols={maxCols}
        />
        {this.state.currentPlayer && <div className="status">
          Current player:
            <span
              className={`current-player__${this.state.currentPlayer}`}
            >
              {this.state.currentPlayer}
            </span>
        </div>}
      </main>
    );
  }
}

export default App;
