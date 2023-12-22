import { Cell, Figures } from "./Cell";

export class Figure {
  cell: Cell;
  name: Figures;
  id: number;
  logo: string | null;

  constructor(cell: Cell) {
    this.cell = cell;
    this.name = Figures.KNIGHT;
    this.id = Math.random();
    this.logo = null;
    this.cell.figure = this;
  }

  public canMove(cell: Cell): boolean {
    if (this.name === "Pawn") return false;
    return true;
  }
}
