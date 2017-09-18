import Node from './Node.js';
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

  execute() {
    
    while (this.queue.length > 0) {
      var current = this.queue.dequeue();
      if (current.strRepresentation == this.goal.strRepresentation) {
        alert("terminated");
        return current;
      }
      this.visited.add(current.strRepresentation);
      // console.log(current.strRepresentation);
      this.expandNode(current);
    }
    return -1;
    // console.log("PQ: " + this.queue.length + ", Set: " + this.visited.size);
  }

  expandNode(node) {
    var temp;
    var newState;
    var col = node.emptyCol;
    var row = node.emptyRow;
    var newNode;

    // Up
    if (row > 0) {
      newState = node.state.clone();
      temp = newState[row - 1][col];
      newState[row - 1][col] = this.empty;
      newState[row][col] = temp;
      newNode = new Node(0, newState, row - 1, col,  node.depth + 1);

      if (!this.visited.has(newNode.strRepresentation)) {
        newNode.value = newNode.depth + this.heuristic(newNode);
        newNode.path = node.path + "U";
        this.queue.queue(newNode);
        // console.log("up " + newNode.strRepresentation);
        //this.visited.add(newNode.strRepresentation);
      }
    }

    // Down
    if (row < node.size - 1) {
      newState = node.state.clone();
      temp = newState[row + 1][col];
      newState[row + 1][col] = this.empty;
      newState[row][col] = temp;
      newNode = new Node(0, newState, row + 1, col, node.depth + 1);

      if (!this.visited.has(newNode.strRepresentation)) {
        newNode.value = newNode.depth + this.heuristic(newNode);
        newNode.path = node.path + "D";
        this.queue.queue(newNode);
        // console.log("down " + newNode.strRepresentation);
        //this.visited.add(newNode.strRepresentation);
      }
    }

    // Left
    if (col > 0) {
      newState = node.state.clone();
      temp = newState[row][col - 1]
      newState[row][col - 1] = this.empty
      newState[row][col] = temp
      newNode = new Node(0, newState, row, col - 1, node.depth + 1)

      if (!this.visited.has(newNode.strRepresentation)) {
        newNode.value = newNode.depth + this.heuristic(newNode);
        newNode.path = node.path + "L";
        this.queue.queue(newNode);
        // console.log("left " + newNode.strRepresentation);
        //this.visited.add(newNode.strRepresentation);
      }
    }

    // Right
    if (col < node.size - 1) {
      newState = node.state.clone();
      temp = newState[row][col + 1];
      newState[row][col + 1] = this.empty;
      newState[row][col] = temp;
      newNode = new Node(0, newState, row, col + 1, node.depth + 1);

      if (!this.visited.has(newNode.strRepresentation)) {
        newNode.value = newNode.depth + this.heuristic(newNode);
        newNode.path = node.path + "R";
        this.queue.queue(newNode);
        // console.log("right " + newNode.strRepresentation);
      //  this.visited.add(newNode.strRepresentation);
      }
    }
  }

  heuristic(node) {
    return this.manhattanDistance(node);
    // + this.linearConflicts(node);
  }

  manhattanDistance(node) {
    var result = 0;

    for (var i = 0; i < node.state.length; i++) {
      for (var j = 0; j < node.state[i].length; j++) {
        var elem = node.state[i][j];
        var found = false;
        for (var h = 0; h < this.goal.state.length; h++) {
          for (var k = 0; k < this.goal.state[h].length; k++) {
            if (this.goal.state[h][k] == elem) {
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
