import React from "react";
import CellComponents from "./CellComponents";
import { Board } from "../classes/Board";
import { Figures } from "../classes/Cell";
import { Knight } from "../classes/Knight";
import { Pawn } from "../classes/Pawn";

interface IBoardComponent {
  board: Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

const BoardComponent: React.FC<IBoardComponent> = ({ board, setBoard }) => {
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("cell--active");
    const selectedFigure = event.dataTransfer.getData("selectedFigure") as Figures;

    const x = Number(event.currentTarget.getAttribute("datatype-x"));
    const y = Number(event.currentTarget.getAttribute("datatype-y"));

    if (x === undefined || y === undefined) return;
    if (!selectedFigure.length) return;

    const isCellEmpty = !board.cells[x][y].figure;

    if (isCellEmpty) {
      const updatedBoard = [...board.cells];
      if (selectedFigure === "Knight") {
        new Knight(updatedBoard[x][y]);
      } else {
        new Pawn(updatedBoard[x][y]);
      }
      const newBoard = new Board();
      newBoard.cells = updatedBoard;
      selectedFigure === "Knight" ? (newBoard.getCell(x, y).stepNumber = 1) : null;

      setBoard(newBoard);
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add("cell--active");
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove("cell--active");
  };

  return (
    <div className="board">
      {board.cells.map((row, index) => {
        return (
          <React.Fragment key={index}>
            {row.map((cell) => {
              return (
                <CellComponents
                  cell={cell}
                  key={cell.id}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BoardComponent;
