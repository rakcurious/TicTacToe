import o from "./assets/icon_o.svg";
import x from "./assets/icon_x.svg";
import e from "./assets/icon_edit.svg";
import { useState } from "react";
import thumbnail from "./assets/ticthumbnail.png";

function TicTacToe() {
  const [tic, setTic] = useState([e, e, e, e, e, e, e, e, e]);
  const [turn, setTurn] = useState(x);
  const [firstTurn, setFirstTurn] = useState(x);
  const [score, setScore] = useState([0, 0, 0]);

  function newGame() {
    let toc = [...tic];
    for (let i = 0; i < 9; i++) {
      toc[i] = e;
    }
    setTic(toc);
    firstTurn == x ? setTurn(o) : setTurn(x);
    firstTurn == x ? setFirstTurn(o) : setFirstTurn(x);
  }

  function checkWinner(tac) {
    const over = tac.filter((element) => element == e);
    if (
      (tac[0] === tac[1] && tac[1] === tac[2] && tac[0] !== e) ||
      (tac[3] === tac[4] && tac[4] === tac[5] && tac[3] !== e) ||
      (tac[6] === tac[7] && tac[7] === tac[8] && tac[6] !== e) ||
      (tac[0] === tac[3] && tac[3] === tac[6] && tac[0] !== e) ||
      (tac[1] === tac[4] && tac[4] === tac[7] && tac[1] !== e) ||
      (tac[2] === tac[5] && tac[5] === tac[8] && tac[2] !== e) ||
      (tac[0] === tac[4] && tac[4] === tac[8] && tac[0] !== e) ||
      (tac[2] === tac[4] && tac[4] === tac[6] && tac[2] !== e)
    ) {
      if (turn == x) {
        setTurn("Winner: X");
        let scr = [...score];
        scr[0] += 1;
        setScore(scr);
      } else {
        setTurn("Winner: O");
        let scr = [...score];
        scr[1] += 1;
        setScore(scr);
      }
    } else if (over.length == 0) {
      setTurn("Game Tied!");
      let scr = [...score];
      scr[2] += 1;
      setScore(scr);
    } else {
      if (turn === x) {
        setTurn(o);
      } else if (turn === o) {
        setTurn(x);
      }
    }
  }

  function changeTic(index) {
    let tac = [...tic];
    tac[index] = turn;
    setTic(tac);
    checkWinner(tac);
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-purple-500/60 to-purple-500">
      <h1 className="text-black text-4xl  text-center p-10 lg:p-3 font-bold font-mono ">
        Tic Tac Toe
      </h1>
      <img className="h-0 w-0 hidden" src={thumbnail}/>
      <div className=" flex justify-center items-baseline">
        <h1
          className={
            turn == x || turn == o
              ? "text-black-700 text-2xl lg:text-3xl text-center m-4 font-bold font-mono"
              : turn == "Game Tied!"
              ? "text-purple-800  text-2xl lg:text-3xl text-center m-4 font-mono font-bold"
              : "text-green-700 text-2xl lg:text-3xl text-center m-4 font-mono font-bold"
          }
        >
          {turn == x ? "X's turn" : turn == o ? "O's turn" : `${turn}`}
        </h1>
        <button
          onClick={() => newGame()}
          className={
            turn == x || turn == o
              ? "bg-purple-500 hover:bg-purple-600 h-12  w-40 hover:rounded-xl m-4 text-xl transition ease-in-out hover:-translate-y-0.5  duration-500 font-mono font-bold pt-1 rounded-full pb-1"
              : "bg-purple-500 hover:bg-purple-600 h-12  w-40 hover:rounded-xl m-4 text-xl transition ease-in-out hover:-translate-y-0.5  duration-500 font-mono font-bold pt-1 rounded-full animate-bounce"
          }
        >
          New Game
        </button>
      </div>
      <div className="flex justify-center items-center flex-col">
        <div className="relative bg-gradient-to-b from-purple-500/80 to-purple-600/50 w-80 h-80  lg:h-120  lg:w-120  rounded-lg flex justify-evenly flex-wrap items-center py-2 ">
          {tic.map((state, index) => (
            <div
              key={index}
              onClick={
                tic[index] == e && (turn == o || turn == x)
                  ? () => changeTic(index)
                  : null
              }
              className="bg-yellow-400 shadow lg:w-24 h-1/5 w-1/5 lg:h-24 rounded-xl my-4 mx-4"
            >
              <img
                className="lg:h-16 lg:w-16 h-3/4 w-3/4 m-2 lg:m-4"
                src={state}
                alt="icon"
              />
            </div>
          ))}
          {(turn == "Winner: O" || turn == "Winner: X") && (
            <div className="absolute z-10 ">
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_laGIqKVpcD.json"
                background="transparent"
                speed={1}
                style={{ width: "100%", height: "100%" }}
                autoPlay=""
              />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center w-80 lg:w-120 mt-2 lg:p-0 p-2 flex-wrap lg:flex-nowrap">
          <div className="flex justify-around items-center w-60 lg:-translate-x-4">
            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl font-bold font-mono">X </p>
              <p className="text-2xl font-bold font-mono">{score[0]}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl font-bold font-mono">O</p>
              <p className="text-2xl font-bold font-mono">{score[1]}</p>
            </div>
            <div className="flex col flex-col justify-center items-center">
              <p className="text-2xl font-bold font-mono">Tie</p>
              <p className="text-2xl font-bold font-mono">{score[2]}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setScore([0, 0, 0]), newGame();
            }}
            className="bg-purple-600 hover:bg-purple-700 h-12 w-40 hover:rounded-xl text-xl transition ease-in-out hover:-translate-y-0.5  duration-500 font-mono font-bold mt-2 mr-2 lg:m-0 rounded-full"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicTacToe;
