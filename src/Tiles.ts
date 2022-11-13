export default class Tiles {
  getAllTiles() {
    //   console.log(Array.from(document.querySelectorAll(".game-board .box")));
    return Array.from(document.querySelectorAll(".game-board .box"));
  }

  getEmptyTiles() {
    const allTiles = this.getAllTiles();
    return allTiles.filter((el) => !el.textContent);
  }

  getTileValue(tileIndex: number) {
    const allTiles = this.getAllTiles();
    return Number(allTiles[tileIndex].textContent) || null;
  }

  changeTileValue(tileIndex: number, newValue: number) {
    const allTiles = this.getAllTiles();

    allTiles[tileIndex].textContent = String(newValue);
  }

  setAllTileValues() {
    const allTiles = this.getAllTiles();
    allTiles[4].textContent = "2";
    allTiles[5].textContent = "2";
  }

  deleteTile(tileIndex: number) {
    const allTiles = this.getAllTiles();
    allTiles[tileIndex].textContent = null;
  }
}
