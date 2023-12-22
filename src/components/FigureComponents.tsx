import React from "react";
import { IFigures } from "./AddFigure";

interface IFigureComponent {
  figure: IFigures;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  isAvailable: boolean;
}

const FigureComponents: React.FC<IFigureComponent> = ({ figure, onDragStart, isAvailable }) => {
  return (
    <div className={`figure ${!isAvailable ? "figure--disable" : ""}`} draggable onDragStart={onDragStart}>
      <img src={figure.img} alt={figure.name} />
      <figcaption>{figure.name}</figcaption>
    </div>
  );
};

export default FigureComponents;
