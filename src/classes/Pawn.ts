import { Cell, Figures } from "./Cell";
import { Figure } from "./Figure";
import PAWN_FIGURE from "../../public/Pawn.svg";

export class Pawn extends Figure {
  constructor(cell: Cell) {
    super(cell);
    this.logo = PAWN_FIGURE;
    this.name = Figures.PAWN;
  }
}
