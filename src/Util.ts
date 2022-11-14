export default class Util {
  getRandomArrayIndex(array: any) {
    return Math.floor(Math.random() * array.length);
  }

  getRandom2DArrayIndex(array: any[][]) {
    return [
      this.getRandomArrayIndex(array),
      this.getRandomArrayIndex(array[0]),
    ];
  }

  getEmpty2DArrayValues(array: any[][]) {
    const emptyBoardValues: number[][] = [];

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (!array[i][j]) {
          emptyBoardValues.push([i, j]);
        }
      }
    }
    return emptyBoardValues;
  }

  getRandomArrayPositions(array: any[][], quantity: number) {
    const randomPositions: number[] = [];
    const emptyBoardValues = this.getEmpty2DArrayValues(array);

    for (let i = 0; i < quantity; i++) {
      const randomPosition = this.getRandomArrayIndex(emptyBoardValues);
      if (randomPositions.includes(randomPosition)) {
        i--;
        continue;
      }
      randomPositions.push(randomPosition);
    }
    return randomPositions;
  }
}
