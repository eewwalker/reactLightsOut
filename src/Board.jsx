import React, { useState } from "react";
import { sample } from "lodash";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *, chanceLightStartsOn
 **/

function Board({ nrows, ncols}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    const status = [true, false];

    for (let row = 0; row < nrows; row++) {
      let newRow = [];
      for (let col = 0; col < ncols; col++) {
        newRow.push(sample(status));

      }
      initialBoard.push(newRow);
    }

    return initialBoard;
  }
  /** Checks board game if any value is equal to true  */
  function hasWon() {
   const hasLight = board.map(b => b.filter(l => l === true));

    return hasLight.length === 0;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);
      flipCell(y, x, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y, x+1, boardCopy);

      return boardCopy;

    });
  }
console.log('board', board)
createBoard();
    return (
      <div className="Board">
        <table>
          <tr>
            {board.map(b => b.map(board => <Cell flipCellsAroundMe = {flipCellsAround}/>))}
          </tr>
        </table>
      </div>
    )
  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
