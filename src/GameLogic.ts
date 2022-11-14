import { ArrowKeyCodes } from "./Game";
import Util from "./Util";
// TODO Refactor this file

export default class GameLogic {
  util;

  constructor() {
    this.util = new Util();
  }

  combine(direction: String, boardValues: number[][]) {
    if (direction === ArrowKeyCodes.ArrowRight) {
      for (let i = 0; i < boardValues.length; i++) {
        for (let j = boardValues[i].length - 1; j >= 0; j--) {
          if (!boardValues[i][j]) {
            continue;
          }
          for (let k = j - 1; k >= 0; k--) {
            if (boardValues[i][k]) {
              if (boardValues[i][j] === boardValues[i][k]) {
                boardValues[i][j] *= 2;
                boardValues[i][k] = 0;
              }
              break;
            }
          }
        }
      }
    }
    if (direction === ArrowKeyCodes.ArrowLeft) {
      for (let i = 0; i < boardValues.length; i++) {
        for (let j = 0; j < boardValues[i].length; j++) {
          if (boardValues[i][j]) {
            for (let k = j + 1; k < boardValues[i].length; k++) {
              if (!boardValues[i][k]) {
                continue;
              }
              if (boardValues[i][j] === boardValues[i][k]) {
                boardValues[i][j] *= 2;
                boardValues[i][k] = 0;
              }
              break;
            }
          }
        }
      }
    }
    if (direction === ArrowKeyCodes.ArrowUp) {
      for (let i = 0; i < boardValues.length; i++) {
        for (let j = 0; j < boardValues[i].length; j++) {
          if (!boardValues[i][j]) {
            continue;
          }
          for (let k = i + 1; k < boardValues.length; k++) {
            if (!boardValues[k][j]) {
              continue;
            }
            if (boardValues[i][j] === boardValues[k][j]) {
              boardValues[i][j] *= 2;
              boardValues[k][j] = 0;
            }
            break;
          }
        }
      }
    }

    if (direction === ArrowKeyCodes.ArrowDown) {
      for (let i = boardValues.length - 1; i >= 0; i--) {
        for (let j = 0; j < boardValues[i].length; j++) {
          if (!boardValues[i][j]) {
            continue;
          }
          for (let k = i - 1; k >= 0; k--) {
            if (!boardValues[k][j]) {
              continue;
            }
            if (boardValues[i][j] === boardValues[k][j]) {
              boardValues[i][j] *= 2;
              boardValues[k][j] = 0;
            }
            break;
          }
        }
      }
    }
    return boardValues;
  }

  push(direction: String, boardValues: number[][]) {
    if (direction === ArrowKeyCodes.ArrowRight) {
      for (let i = 0; i < boardValues.length; i++) {
        for (let j = boardValues[i].length - 1; j >= 0; j--) {
          if (!boardValues[i][j]) {
            for (let k = j - 1; k >= 0; k--) {
              if (boardValues[i][k]) {
                boardValues[i][j] = boardValues[i][k];
                boardValues[i][k] = 0;
                break;
              }
            }
          }
        }
      }
    }
    if (direction === ArrowKeyCodes.ArrowLeft) {
      for (let i = 0; i < boardValues.length; i++) {
        for (let j = 0; j < boardValues[i].length; j++) {
          if (!boardValues[i][j]) {
            for (let k = j + 1; k < boardValues[i].length; k++) {
              if (boardValues[i][k]) {
                boardValues[i][j] = boardValues[i][k];
                boardValues[i][k] = 0;
                break;
              }
            }
          }
        }
      }
    }
    if (direction === ArrowKeyCodes.ArrowUp) {
      for (let i = 0; i < boardValues.length; i++) {
        for (let j = 0; j < boardValues[i].length; j++) {
          if (!boardValues[i][j]) {
            for (let k = i + 1; k < boardValues.length; k++) {
              if (boardValues[k][j]) {
                boardValues[i][j] = boardValues[k][j];
                boardValues[k][j] = 0;
                break;
              }
            }
          }
        }
      }
    }
    if (direction === ArrowKeyCodes.ArrowDown) {
      for (let i = boardValues.length - 1; i >= 0; i--) {
        for (let j = 0; j < boardValues[i].length; j++) {
          if (!boardValues[i][j]) {
            for (let k = i - 1; k >= 0; k--) {
              if (boardValues[k][j]) {
                boardValues[i][j] = boardValues[k][j];
                boardValues[k][j] = 0;
                break;
              }
            }
          }
        }
      }
    }
    return boardValues;
  }

  move(direction: String, boardValues: number[][]) {
    const initialBoardValues = JSON.parse(JSON.stringify(boardValues));
    const combinedValues = this.combine(direction, boardValues);
    const pushedValues = this.push(direction, combinedValues);

    if (JSON.stringify(initialBoardValues) !== JSON.stringify(boardValues)) {
      return { changed: true, boardValues: pushedValues };
    }
    return { changed: false, boardValues: pushedValues };
  }

  matchesAvailable(boardValues: number[][]) {
    for (let i = 0; i < boardValues.length; i++) {
      for (let j = 0; j < boardValues[i].length; j++) {
        if (boardValues[i][j] === 0) {
          return true;
        }
        if (
          i < boardValues.length - 1 &&
          boardValues[i][j] === boardValues[i + 1][j]
        ) {
          return true;
        }
        if (
          j < boardValues[i].length - 1 &&
          boardValues[i][j] === boardValues[i][j + 1]
        ) {
          return true;
        }
      }
    }
    return false;
  }
  isGameLost(boardValues: number[][]) {
    if (
      !this.matchesAvailable(boardValues) &&
      this.util.isArrayFull(boardValues)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
