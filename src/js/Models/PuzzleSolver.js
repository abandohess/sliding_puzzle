import PriorityQueue from 'js-priority-queue';
import BoardModel from './BoardModel.js';


class State {
  constructor(boardModel, moves) {
    this.boardModel = boardModel;
    this.moves = moves;
    this.cost = moves.length + boardModel.calculateHeuristic();
  }

  expandFrontier(){
    let newStates = [];
    let possibleMoves = this.boardModel.getMoves();
    for (var i = 0; i < possibleMoves.length; i++) {
      let move = possibleMoves[i];
      // if (move > this.boardModel.board.length - 1) {
      //   var coordinates =
      //   console.log(this.boardModel.board);
      //   console.log("possible moves: " + possibleMoves);
      // }
      let newBoard = this.boardModel.cloneBoardModel();
      let moves = this.moves.slice();
      newBoard.makeMove(move);
      moves.push(move);
      let newState = new State(newBoard, moves)
      newStates.push(newState);
    }
    return newStates;
  }
}

class PuzzleSolver {
  constructor(boardModel) {
    this.pq = new PriorityQueue({
        comparator: function(a, b){ return a.cost - b.cost; }
    });
    this.pq.queue(new State(new BoardModel(boardModel), []));
  }

  AStar() {
    let visited = new Set();
    let iterations = 0;
    while (this.pq.length > 0) {
      console.log("pq len: " + this.pq.length + ", set len: " + visited.size);
      iterations ++;
      if (iterations > 200000) {
        return false;
      }
      let currState = this.pq.dequeue();
      if (currState.boardModel.gameOver()) {
        alert("solved!");
        return currState.moves;
      } else {
        visited.add(currState);
        let newStates = currState.expandFrontier();
        for (let i = 0; i < newStates.length; i ++) {
          let newState = newStates[i];
          if (!visited.has(newState)) {
            this.pq.queue(newState);
          }  else {
            alert("didnt put in set");
          }
        }
      }
    }
  }

  testSet() {
    let obj1 = {x: 1, y: 1};
    let array = [];
    array.push(obj1);
    array.push(obj1);

    let set = new Set();
    set.add(array[0]);
    set.add(array[1]);
    console.log(set.size);
  }
}

export default PuzzleSolver;
