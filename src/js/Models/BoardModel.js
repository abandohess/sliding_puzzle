import _ from 'lodash';

class BoardModel {
  constructor(board){
    this.board = board;
    this.width = Math.sqrt(board.length);
  }

  calculateHeuristic() {
    let manhattanDistance = 0;
    for (let i = 0; i < this.width; i++) {
      let tile = this.board[i];
      let xDiff = Math.abs(tile.startX - tile.currX);
      let yDiff = Math.abs(tile.startY - tile.currY);
      manhattanDistance += xDiff;
      manhattanDistance += yDiff;
    }
  }

  cloneBoardModel() {
    let clone = new BoardModel(_.clone(this.board));
    return clone;
  }

  getWhiteTile() {
    let whiteTileIndex = this.board.findIndex(tile => {
      return (tile.key ==  -1);
    });
    return whiteTileIndex;
  }

  getMoves() {
    let coordinateMoves = [];
    let whiteTile = this.getWhiteTile();
    let coordinates = this.getCoordinates(whiteTile);
    if (coordinates[0] > 0) coordinateMoves.push([coordinates[0] - 1, coordinates[1]]);
    if (coordinates[0] < this.width - 1) coordinateMoves.push([coordinates[0] + 1, coordinates[1]]);
    if (coordinates[1] > 0) coordinateMoves.push([coordinates[0], coordinates[1] - 1]);
    if (coordinates[1] < this.width - 1) coordinateMoves.push([coordinates[0], coordinates[1] + 1]);
    let indexMoves = [];
    for (var i = 0; i < coordinateMoves.length; i++) {
      indexMoves.push(this.getIndex(coordinateMoves[i]));
      // console.log("coordinates: " + coordinateMoves[i]);
      // console.log("index: " + this.getIndex(coordinateMoves[i]));
    }
    return indexMoves;
  }

  getCoordinates(index) {
    let coordinates = new Array(2);
    let whiteTile = this.getWhiteTile();
    let xCoord = whiteTile % this.width;
    let yCoord = Math.floor(whiteTile/this.width);
    coordinates[0] = xCoord;
    coordinates[1] = yCoord;
    return coordinates;
  }

  getIndex(coordinates) {
    return ((coordinates[1] * this.width) + coordinates[0]);
  }

  gameOver() {
    for (let i = 0; i < this.board.length; i++) {
      let tile = this.board[i];
      if (tile.currX != tile.startX || tile.currY != tile.startY) {
        return false;
      }
    }
    return true;
  }

  makeMove(index) {
    let whiteTile = this.getWhiteTile();
    let first = this.board[index];
    let firstX = this.board[index].currX;
    let firstY = this.board[index].currY;
    let second = this.board[whiteTile];
    let secondX = this.board[whiteTile].currX;
    let secondY = this.board[whiteTile].currY;

    this.board[index] = second;
    this.board[whiteTile] = first;
    this.board[index].currX = firstX;
    this.board[index].currY = firstY;
    this.board[whiteTile].currX = secondX;
    this.board[whiteTile].currY = secondY;
  }


}

export default BoardModel;
