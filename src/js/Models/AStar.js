import State from './State.js';
import PriorityQueue from 'js-priority-queue';

class AStar {
  constructor(initial, goal, empty) {
    this.initial = initial;
    this.goal = goal;
    this.empty = empty;

    this.queue = new PriorityQueue({
        comparator: function(a, b){ return a.value - b.value; }
    });

   this.queue.queue(initial);
   this.visited = new Set();
  }

  solve(stopEarly) {
    let someIterations = false;
    if (!stopEarly) {
      someIterations = true;
      stopEarly = true;
    }
    let iterations = 0;
    let max = 10;
    let visited = new Set();
    if(stopEarly) console.log("INITIAL QUEUE SIZE: " + this.queue.length);
    while (this.queue.length > 0) {
      if(someIterations && iterations > max) stopEarly = false;
      if (stopEarly) console.log("entering loop");
      if (stopEarly && iterations > max) break;
      iterations ++;
      // console.log("queue len: " + this.queue.length + ", set size: " + visited.size);
      let current = this.queue.dequeue();
      if (current.strRepresentation == this.goal.strRepresentation) {
        alert("terminated");
        return current;
      } else {
        visited.add(current.strRepresentation);

        let frontier = this.expand(current, stopEarly);
        // console.log(frontier);
        for (let i = 0; i < frontier.length; i++) {
          let newState = frontier[i];
          // console.log(visited);
          // console.log(frontier);
          if (!visited.has(newState.strRepresentation)) {
            // console.log("newState str: " + newState.strRepresentation);
            this.queue.queue(newState);
          }
        }
      }
    }
    return -1;
    // console.log("PQ: " + this.queue.length + ", Set: " + this.visited.size);
  }

  expand(state, stopEarly) {
    let states = [];
    let moves = this.getValidMoves(state);
    if(stopEarly) console.log("move size: " + moves.length);

    // todo make sure not same move we came from
    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      let newBoard = state.board.clone();
      let newState = new State(0, newBoard, state.emptyRow, state.emptyCol, state.depth + 1);
      newState.value = newState.depth + this.heuristic(newState);
      newState.path = state.path;
      this.move(newState, move, stopEarly);
      states.push(newState);
    }
    return states;
  }

  getValidMoves(state) {
    let col = state.emptyCol;
    let row = state.emptyRow;
    let valid = [];
    if (row > 0) valid.push("U");
    if (row < state.size - 1) valid.push("D");
    if (col > 0) valid.push("L");
    if (col < state.size - 1) valid.push("R");
    return valid;
  }

  move(state, direction, stopEarly) {
    let swapPos = null;
    switch (direction) {
      case "U":
        swapPos = [state.emptyRow - 1, state.emptyCol];
        state.path += "U";
        break;
      case "D":
        swapPos =[state.emptyRow + 1, state.emptyCol];
        state.path += "D";
        break;
      case "L":
        swapPos =[state.emptyRow, state.emptyCol - 1];
        state.path += "L";
        break;
      case "R":
        swapPos =[state.emptyRow, state.emptyCol + 1];
        state.path += "R";
        break;
      default:
        throw 'Ivalid Direction';
    }
    if (swapPos !== null) {
      if(stopEarly) {
        console.log("Old board: " + state.board);
        console.log("Direction: " + direction);
      }
      this.swap(state, swapPos);
      if (stopEarly) {
        console.log("New board: " + state.board);
        console.log("****************");
      }
    }
  }

  swap(state, swapPos) {
    let row = state.emptyRow;
    let col = state.emptyCol;
    state.board[row][col] = state.board[swapPos[0]][swapPos[1]];
    state.board[swapPos[0]][swapPos[1]] = this.empty;
    state.emptyRow = swapPos[0];
    state.emptyCol = swapPos[1];
    state.createString(state.board);
  }

  heuristic(state) {
    return this.manhattanDistance(state);
    // + this.linearConflicts(node);
  }

  manhattanDistance(state) {
    let result = 0;

    for (let i = 0; i < state.board.length; i++) {
      for (let j = 0; j < state.board[i].length; j++) {
        let elem = state.board[i][j];
        let found = false;
        for (let h = 0; h < this.goal.board.length; h++) {
          for (let k = 0; k < this.goal.board[h].length; k++) {
            if (this.goal.board[h][k] == elem) {
              result += Math.abs(h - i) + Math.abs(j - k);
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }
    }
    return result;
  }

  getMoveIndex(direction, board) {
    let whiteTile = board.findIndex(image => {
      return (image.key ==  -1);
    });
    let width = Math.sqrt(board.length);
    let row = Math.floor(whiteTile/width);
    let col = whiteTile % width;

    let move = null;
    switch (direction) {
      case "U":
        move = [row - 1, col];
        break;
      case "D":
        move =[row + 1, col];
        break;
      case "L":
        move =[row, col - 1];
        break;
      case "R":
        move =[row, col + 1];
        break;
      default:
        throw 'Ivalid Direction';
    }
    if (move !== null) {
      let index = this.getIndex(move, width);
      return index;
    }
  }

  getIndex(coordinates, width) {
    return ((coordinates[0] * width) + coordinates[1]);
  }

//   linearConflicts(node) {
//     var result = 0;
//     var state = node.state;
//
//     // Row Conflicts
//     for (var i = 0; i < state.length; i++) {
//       result += this.findConflicts(state, i, 1);
//     }
//     // Column Conflicts
//     for (var i = 0; i < state[0].length; i++) {
//       result += this.findConflicts(state, i, 0);
//     }
//
//     return result;
//     }
//
//   findConflicts(state, i, dimension) {
//     var result = 0;
//     var tilesRelated = new Array();
//
//     // Loop foreach pair of elements in the row/column
//     for (var h = 0; h < state.length - 1 && !tilesRelated.has(h); h++) {
//       for (var k = h + 1; k < state.length && !tilesRelated.has(h); k++) {
//         var moves = dimension == 1
//           ? this.inConflict(i, state[i][h], state[i][k], h, k, dimension)
//           : this.inConflict(i, state[h][i], state[k][i], h, k, dimension);
//
//         if (moves == 0) continue;
//         result += 2;
//         tilesRelated.push([h, k ]);
//         break;
//       }
//     }
//
//     return result;
//   }
//
// inConflict(index, a, b, indexA, indexB, dimension) {
//   var indexGoalA = -1;
//   var indexGoalB = -1;
//
//   for (var c = 0; c = 0 && indexGoalB >= 0) && ((indexA  indexGoalB) || (indexA > indexB && indexGoalA < indexGoalB))
//     ? 2
//     : 0;
//   }
}

Array.prototype.clone = function() {
   return JSON.parse(JSON.stringify(this));
}

export default AStar;
