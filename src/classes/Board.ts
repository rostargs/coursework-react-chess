import { Cell } from "./Cell";
import { Knight } from "./Knight";

const ROWS = 8;
const COLUMNS = 8;

export enum Color {
  GREY = "grey",
  WHITE = "white",
}

export class Board {
  cells: Cell[][] = [];

  public generateBoard() {
    for (let i = 0; i < COLUMNS; i++) {
      const rows: Cell[] = [];
      for (let j = 0; j < ROWS; j++) {
        if ((i + j) % 2 === 0) {
          rows.push(new Cell(this, i, j, Color.GREY, null));
        } else {
          rows.push(new Cell(this, i, j, Color.WHITE, null));
        }
      }
      this.cells.push(rows);
    }
  }

  public copyBoard = (): Board => {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  };

  public isAvailableMoves() {
    return this.cells.every((row) => row.every((cell) => (cell.figure !== null ? true : cell.isVisited)));
  }

  public getCell(x: number, y: number) {
    return this.cells[x][y];
  }

  public findKnight(): Cell | null {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        const cell = this.cells[i][j];
        if (cell && cell.figure instanceof Knight) {
          return cell;
        }
      }
    }
    return null;
  }

  public isValidCell(x: number, y: number): boolean {
    return x >= 0 && x < ROWS && y >= 0 && y < COLUMNS;
  }
  // Алгоритм реалізований за правилом Варнсдорфа

  public knightTourVarnsdorf(currentKnightPostion: Cell | null) {
    console.time("Varnsdorf");
    if (currentKnightPostion === null) return;

    const possibleMoves = [
      { dx: 1, dy: 2 },
      { dx: 1, dy: -2 },
      { dx: -1, dy: 2 },
      { dx: -1, dy: -2 },
      { dx: 2, dy: 1 },
      { dx: 2, dy: -1 },
      { dx: -2, dy: 1 },
      { dx: -2, dy: -1 },
    ];

    const findPosibleMovesOnCurrentPosition = (currentPosition: Cell) => {
      const nextSteps: Cell[] = [];
      possibleMoves.forEach((move) => {
        const nextX = move.dx + currentPosition.x;
        const nextY = move.dy + currentPosition.y;

        if (this.isValidCell(nextX, nextY)) {
          nextSteps.push(this.getCell(nextX, nextY));
        }
      });

      return nextSteps.filter((cell) => !cell.isVisited && !cell.figure);
    };

    const findNextMoves = (availableMoves: Cell[]) => {
      const nextMoves: Cell[][] = [];

      availableMoves.forEach((move) => {
        nextMoves.push(findPosibleMovesOnCurrentPosition(move));
      });

      return nextMoves;
    };

    const findMinimumPathIndex = (moves: Cell[][]) => {
      let index = 0,
        startIndex = moves[0],
        length = moves.length;

      while (length--) {
        if (moves[length] < startIndex) {
          startIndex = moves[length];
          index = length;
        }
      }

      return index;
    };

    let availableMoves = findPosibleMovesOnCurrentPosition(currentKnightPostion);

    const nextSteps = findNextMoves(availableMoves);

    if (nextSteps.length === 0) return false;

    const minPathIndex = findMinimumPathIndex(nextSteps);

    currentKnightPostion.moveFigure(availableMoves[minPathIndex]);

    console.timeEnd("Varnsdorf");

    return true;
  }

  public knightTourKrinckl(currentPosition: Cell | null) {
    if (!currentPosition) return false;

    const possibleMoves = [
      { dx: 2, dy: 1 },
      { dx: 1, dy: 2 },
      { dx: -1, dy: 2 },
      { dx: -2, dy: 1 },
      { dx: -2, dy: -1 },
      { dx: -1, dy: -2 },
      { dx: 1, dy: -2 },
      { dx: 2, dy: -1 },
    ];

    for (let i = 0; i < this.cells.length ** 2 - 1; i++) {
      let nextMoves: { cell: Cell; movesCount: number }[] = [];

      for (let j = 0; j < 8; j++) {
        const moveX = currentPosition.x + possibleMoves[j].dx;
        const moveY = currentPosition.y + possibleMoves[j].dy;

        if (
          this.isValidCell(moveX, moveY) &&
          !this.getCell(moveX, moveY).isVisited &&
          !this.getCell(moveX, moveY).figure
        ) {
          let movesCount: number = 0;

          for (let k = 0; k < 8; k++) {
            const nextX = moveX + possibleMoves[k].dx;
            const nextY = moveY + possibleMoves[k].dy;

            if (
              this.isValidCell(nextX, nextY) &&
              !this.getCell(nextX, nextY).isVisited &&
              !this.getCell(nextX, nextY).figure
            ) {
              movesCount++;
            }
          }
          nextMoves.push({ cell: this.getCell(moveX, moveY), movesCount });
        }
      }

      nextMoves.sort((a, b) => a.movesCount - b.movesCount);

      if (nextMoves.length > 0) {
        const { cell } = nextMoves[0];

        currentPosition.moveFigure(this.getCell(cell.x, cell.y));
        return true;
      } else {
        return false;
      }
    }
  }
}
