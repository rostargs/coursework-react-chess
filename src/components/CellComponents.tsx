import React from "react";
import { Cell } from "../classes/Cell";
import Pawn from "../../public/Pawn.svg";
import Knight from "../../public/Kingth.svg";

interface ICellComponent {
  cell: Cell;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
}

const CellComponents: React.FC<ICellComponent> = ({ cell, onDrop, onDragOver, onDragLeave }) => {
  const styles = ["cell", cell.color, cell.isVisited ? "cell--visited" : ""].join(" ");
  return (
    <div
      className={styles}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      datatype-x={cell.x}
      datatype-y={cell.y}
    >
      {cell.figure && (
        <img draggable={false} src={cell.figure.name === "Pawn" ? Pawn : Knight} alt={cell.figure.name} />
      )}
      <span>{cell.stepNumber}</span>
    </div>
  );
};

export default CellComponents;
