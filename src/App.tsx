import React from "react";
import "./App.scss";
import { Board } from "./classes/Board";
import BoardComponent from "./components/BoardComponent";
import AddFigure from "./components/AddFigure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export enum Methods {
  VARNSDORF = "Varnsdorf",
  KRINCKL = "Krinckl",
}

const notifySuccess = () => toast.success("Ви пройшли всю дошку 👍👍!");
const notifyError = () => toast.error("На жаль, ще залишились клітинки 😒🤦‍♂️!");

function App() {
  const [board, setBoard] = React.useState<Board>(new Board());
  const [startGame, setStartGame] = React.useState<boolean>(false);
  const [makeMoves, setMakeMoves] = React.useState<boolean>(false);
  const [chooseMethod, setChooseMethod] = React.useState<Methods>(Methods.KRINCKL);
  const [step, setStep] = React.useState<number>(2);

  const startNewGame = () => {
    const newBoard = new Board();
    newBoard.generateBoard();
    setBoard(newBoard);
  };

  const onMoveKnight = () => {
    const knight = board.findKnight();
    if (!knight) return;
    let isAnyMoves: boolean | undefined;
    setStep((prev) => (prev += 1));

    if (chooseMethod === Methods.KRINCKL) {
      isAnyMoves = board.knightTourKrinckl(knight, step);
    } else {
      isAnyMoves = board.knightTourVarnsdorf(knight, step);
    }

    const newBoard = board.copyBoard();
    setBoard(newBoard);
    if (!isAnyMoves) {
      setMakeMoves(false);
      const isAllCellsVisited = newBoard.isAvailableMoves();
      isAllCellsVisited ? notifySuccess() : notifyError();
    }
  };

  React.useEffect(() => {
    let interval: number;
    if (makeMoves) {
      interval = setInterval(onMoveKnight, 250);
    } else {
      clearInterval(interval!);
    }

    return () => clearInterval(interval);
  }, [makeMoves, board]);

  React.useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="container">
      <BoardComponent board={board} setBoard={setBoard} />
      <AddFigure
        board={board}
        startGame={startGame}
        setStartGame={setStartGame}
        setMakeMoves={setMakeMoves}
        onChooseMethod={setChooseMethod}
        method={chooseMethod}
      />
    </div>
  );
}

export default App;
