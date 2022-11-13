import Tiles from "./Tiles";
import Util from "./Util";

export default class Board {
  tiles;
  initialTileValues;
  util;
  size;

  constructor(size: number) {
    this.tiles = new Tiles();
    this.initialTileValues = [2, 4];
    this.util = new Util();
    this.size = size;
  }
  clearBoard() {
    const allTiles = this.tiles.getAllTiles();
    allTiles.forEach((el) => (el.textContent = ""));
  }

  initializeBoard() {
    const table = document.querySelector(".game-board");

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const box = document.createElement("div");
        box.classList.add(`box`, `row-${i}`);
        table?.appendChild(box);
      }
    }
  }

  showGameOver() {
    const gameOverText = document.querySelectorAll(".game-over");
    gameOverText.forEach((el) => el.classList.add("show"));
  }

  removeGameOver() {
    const gameOverText = document.querySelectorAll(".game-over");
    gameOverText.forEach((el) => el.classList.remove("show"));
  }

  updateBoard(boardValues: number[][]) {
    const allTiles = this.tiles.getAllTiles();
    allTiles.forEach((el, index) => {
      const row = Math.floor(index / this.size);
      const column = index % this.size;

      el.textContent = String(boardValues[row][column] || "");
    });
  }
}
