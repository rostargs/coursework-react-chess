import { Cell, Figures } from "./Cell";
import KNIGHT_FIGURE from "../../public/Kingth.svg";
import { Figure } from "./Figure";

export class Knight extends Figure {
  constructor(cell: Cell) {
    super(cell);
    this.logo = KNIGHT_FIGURE;
    this.name = Figures.KNIGHT;
    this.cell.isVisited = true;
  }

  public canMove(cell: Cell): boolean {
    if (!super.canMove(cell)) {
      return false;
    }
    if (cell.figure) return false;
    if (cell.isVisited) return false;
    const dx = Math.abs(this.cell.x - cell.x);
    const dy = Math.abs(this.cell.y - cell.y);
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  }
}
