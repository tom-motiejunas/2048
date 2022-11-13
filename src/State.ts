import Util from "./Util";

export default class State {
  private _boardValues: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  util;
  initialValues;

  constructor() {
    this.util = new Util();
    this.initialValues = [2, 4];
  }

  public isFull(): boolean {
    return this.util.getEmpty2DArrayValues(this.boardValues).length === 0;
  }

  public addRandomValues(quantity = 1): number[][] {
    const emptyBoardValues = this.util.getEmpty2DArrayValues(this.boardValues);
    if (quantity > emptyBoardValues.length) {
      // end game TODO move to game class
      return [[]];
    }
    const randomPositions: number[] = [];

    // TODO refactor
    for (let i = 0; i < quantity; i++) {
      const randomPosition = this.util.getRandomArrayIndex(emptyBoardValues);
      if (randomPositions.includes(randomPosition)) {
        i--;
        continue;
      }
      randomPositions.push(randomPosition);
    }

    randomPositions.forEach((el) => {
      const [i, j] = emptyBoardValues[el];
      this._boardValues[i][j] =
        this.initialValues[this.util.getRandomArrayIndex(this.initialValues)];
    });

    return this._boardValues;
  }

  public reset() {
    this._boardValues = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }

  public set boardValues(boardValues: number[][]) {
    this._boardValues = boardValues;
  }

  public get boardValues(): number[][] {
    return this._boardValues;
  }
}
