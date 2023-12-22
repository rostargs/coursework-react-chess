import React from "react";
import FigureComponents from "./FigureComponents";
import Pawn from "../../public/Pawn.svg";
import Knight from "../../public/Kingth.svg";
import { Figures } from "../classes/Cell";
import { Board } from "../classes/Board";
import { ToastContainer } from "react-toastify";
import { Methods } from "../App";

export interface IFigures {
  img: string;
  name: Figures;
}

interface IAddFigure {
  board: Board;
  startGame: boolean;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  onChooseMethod: React.Dispatch<React.SetStateAction<Methods>>;
  setMakeMoves: React.Dispatch<React.SetStateAction<boolean>>;
  method: Methods;
}

type IFiguresCount = IFigures & { maxCount: number };

const AddFigure: React.FC<IAddFigure> = ({ board, startGame, setStartGame, method, onChooseMethod, setMakeMoves }) => {
  const figures: IFiguresCount[] = [
    {
      img: Pawn,
      name: Figures.PAWN,
      maxCount: 63,
    },
    {
      img: Knight,
      name: Figures.KNIGHT,
      maxCount: 1,
    },
  ];

  const countFigures = (name: Figures) => {
    const value = board.cells.reduce((row, currentRow) => {
      return (row += currentRow.reduce((acc, curr) => {
        return (acc += curr.figure?.name === name ? 1 : 0);
      }, 0));
    }, 0);
    return value;
  };

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, card: IFigures) => {
    const figureIndex = figures.findIndex((figure) => figure.name === card.name);
    const isLower = countFigures(card.name) < figures[figureIndex].maxCount;

    if (!isLower) return;
    event.dataTransfer.setData("selectedFigure", card.name);
  };

  const countKnight = countFigures(Figures.KNIGHT) === figures[1].maxCount;

  const onMove = () => {
    setMakeMoves(true);
  };

  const onSelectMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChooseMethod(event.target.value as Methods);
  };

  return (
    <div className="add-figure">
      <h1>Перетягніть фігурки на дошку</h1>
      <main className="add-figure__figures">
        {!startGame &&
          figures.map((figure, index) => {
            const isAvailable = countFigures(figure.name) < figure.maxCount;
            return (
              <FigureComponents
                figure={figure}
                key={index}
                onDragStart={(e) => onDragStart(e, figure)}
                isAvailable={isAvailable}
              />
            );
          })}
      </main>
      <div className="add-figure__buttons">
        {!startGame ? (
          <>
            <select value={method} onChange={onSelectMethod}>
              <option value={Methods.KRINCKL}>{Methods.KRINCKL}</option>
              <option value={Methods.VARNSDORF}>{Methods.VARNSDORF}</option>
            </select>
            <button onClick={() => countKnight && setStartGame(true)} disabled={!countKnight}>
              Start game
            </button>
          </>
        ) : (
          <>
            <button onClick={onMove}>Move figure</button>
            <button onClick={() => location.reload()}>Reset game</button>
          </>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AddFigure;
