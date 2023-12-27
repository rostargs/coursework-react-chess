import { Board, Color } from "./Board";
import { Figure } from "./Figure";

export enum Figures {
  PAWN = "Pawn",
  KNIGHT = "Knight",
}

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Color;
  figure: Figure | null;
  board: Board;
  id: number;
  isVisited: boolean;
  stepNumber?: number;

  constructor(board: Board, x: number, y: number, color: Color, figure: Figure | null, step?: number) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.id = Math.random();
    this.stepNumber = step;
    this.isVisited = false;
  }

  public moveFigure(target: Cell, step: number) {
    if (this.figure) {
      console.log(`Moving figure from ${this.x}, ${this.y} to ${target.x}, ${target.y}`);
      target.setFigure(this.figure);
      this.figure = null;
      target.isVisited = true;
      target.stepNumber = step;

      return target;
    }
  }
  public setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }
}
