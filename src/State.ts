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

    const randomArrayPositions: number[] = this.util.getRandomArrayPositions(
      this.boardValues,
      quantity
    );

    randomArrayPositions.forEach((el) => {
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
