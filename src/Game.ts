import Board from "./Board";
import GameLogic from "./GameLogic";
import State from "./State";

export enum ArrowKeyCodes {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
}

interface Result {
  boardValues: number[][];
  changed: boolean;
}

export default class Game {
  board;
  gameLogic;
  state;

  constructor() {
    this.state = new State();
    this.gameLogic = new GameLogic();
    this.board = new Board(this.state.boardValues[0].length);
  }
  startGame() {
    this.board.initializeBoard();
    this.state.addRandomValues(2);
    this.board.updateBoard(this.state.boardValues);
    this.initializeMoves();
  }
  endGame() {
    this.board.showGameOver();
    const restartBtn = document.querySelector(".restart-btn");
    restartBtn?.addEventListener("click", this.restartGame.bind(this));
    this.deleteMoves();
  }

  restartGame() {
    this.state.reset();
    this.board.clearBoard();
    this.board.removeGameOver();
    this.state.addRandomValues(2);
    this.board.updateBoard(this.state.boardValues);
  }

  handleMove(e: KeyboardEvent) {
    const keyCode = e.code;

    let result: Result = { boardValues: [[]], changed: false };

    switch (keyCode) {
      case ArrowKeyCodes.ArrowUp:
        result = this.gameLogic.move(
          ArrowKeyCodes.ArrowUp,
          this.state.boardValues
        );
        break;
      case ArrowKeyCodes.ArrowDown:
        result = this.gameLogic.move(
          ArrowKeyCodes.ArrowDown,
          this.state.boardValues
        );
        break;
      case ArrowKeyCodes.ArrowLeft:
        result = this.gameLogic.move(
          ArrowKeyCodes.ArrowLeft,
          this.state.boardValues
        );
        break;
      case ArrowKeyCodes.ArrowRight:
        result = this.gameLogic.move(
          ArrowKeyCodes.ArrowRight,
          this.state.boardValues
        );
        break;
      default:
        return;
    }
    this.state.boardValues = result.boardValues;
    if (result.changed) {
      this.state.addRandomValues();
    }
    this.board.updateBoard(this.state.boardValues);

    if (this.gameLogic.isGameLost(this.state.boardValues)) {
      this.endGame();
    }
  }

  initializeMoves() {
    document.addEventListener("keyup", (e) => this.handleMove(e));
  }
  deleteMoves() {
    document.removeEventListener("keyup", this.handleMove);
  }
}
