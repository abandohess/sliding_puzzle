import React, { Component } from 'react';
import Board from './Board.js';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import Menu from './Menu.js';
import BoardModel from '../Models/BoardModel.js';
import PuzzleSolver from '../Models/PuzzleSolver.js';
import AStar from '../Models/AStar.js';
import Node from '../Models/Node.js';
import '../../css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      imageWidth: -1,
      imageHeight: -1,
      puzzleActivated: false,
      tiles: [],
      boardWidth: 3,
      moveCount: 0,
    }
    this.generateTiles = this.generateTiles.bind(this);
    this.movePieces = this.movePieces.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.solvePuzzle = this.solvePuzzle.bind(this);
  }

  solvePuzzle() {
    if (this.state.tiles.length == 0) {
      alert("Please shuffle the board first.")
      return;
    }
    let whiteTileIndex = this.state.tiles.findIndex(image => {
      return (image.key ==  -1);
    });
    let row = whiteTileIndex % this.state.boardWidth;
    let col = Math.floor(whiteTileIndex/this.state.boardWidth);
    let currBoard = [];
    for (let i = 0; i < this.state.boardWidth * this.state.boardWidth; i += this.state.boardWidth) {
      let row = [];
      for (let j = 0; j < this.state.boardWidth; j++) {
        let tile = this.state.tiles[i + j];
        row.push(tile.key + 1);
      }
      currBoard.push(row);
    }

    console.log(currBoard);
    console.log(row);
    console.log(col);

    let init = new Node(0, currBoard, row, col, 0);
    // var init = new Node(0, [[6,4,7],[8,5,0],[3,2,1]], 1, 2, 0);
    let goal = new Node(0, [[1,2,3],[4,5,6],[7,8,0]], 2, 2, 0);

    let astar = new AStar(init, goal, 0);
    // To measure time taken by the algorithm
    let startTime = new Date();
    // Execute AStar
    let result = astar.execute();

    if(result != -1)alert(result.path);
    else alert(result);

    //
    // let moves = [];
    // for (let i = 0; i < result.path.length; i++) {
    //   let moveIndex = this.getMoveIndex(result.path[i]);
    //   moves.push(moveIndex);
    // }
    //
    // alert(moves);
    //
    // // To measure time taken by the algorithm
    // let endTime = new Date();
    // alert('Completed in: ' + (endTime - startTime) + ' milliseconds');
    //
    // let timeouts =[];
    // let delay = 2000;
    // var game = this;
    // for (let i = 0; i < moves.length; i++) {
    //   (function(n) {
    //     timeouts.push(setTimeout(function() {
    //             game.move(n);
    //         }, delay));
    //     } (i));
    //     delay = delay + 1000;
    // }



    // let solver = new PuzzleSolver(this.state.tiles);
    // solver.testSet();
    // let moves = solver.AStar();

  //  alert(moves);
  }

  getMoveIndex(command) {
      let whiteTileIndex = this.state.tiles.findIndex(image => {
        return (image.key ==  -1);
      });
      let coordinates = this.getCoordinates(whiteTileIndex);
      let index = -10;
      console.log("white tile: " + whiteTileIndex);
      console.log("white tile coordinates: " + coordinates);
      if (command == 'U'){
        coordinates=[coordinates[0], coordinates[1] - 1];
        index = this.getIndex(coordinates);
        console.log("UP");
        console.log("new coordinates: " + coordinates);
        console.log("new index: " + index);
        // setTimeout(this.move(index), 1000);
      }
      else if (command == 'D'){
        coordinates=[coordinates[0], coordinates[1] + 1];
        index = this.getIndex(coordinates);
        console.log("DOWN");
        console.log("new coordinates: " + coordinates);
        console.log("new index: " + index);
        // setTimeout(this.move(index), 1000);
      }
      else if (command == 'L'){
        coordinates=[coordinates[0] - 1, coordinates[1]];
        index = this.getIndex(coordinates);
        console.log("LEFT");
        console.log("new coordinates: " + coordinates);
        console.log("new index: " + index);
        // setTimeout(this.move(index), 1000);
      }
      if (command == 'R'){
        coordinates=[coordinates[0] + 1, coordinates[1]];
        index = this.getIndex(coordinates);
        console.log("RIGHT");
        console.log("new coordinates: " + coordinates);
        console.log("new index: " + index);
        // setTimeout(this.move(index), 1000);

      }

      return index;
  }

  getIndex(coordinates) {
    return ((coordinates[1] * this.state.boardWidth) + coordinates[0]);
  }

  generateTiles() {
    if (!this.state.puzzleActivated) {
      var img = document.getElementById("image");
      var imagePieces = [];
      for(var y = 0; y < this.state.boardWidth; y++) {
          for(var x = 0; x < this.state.boardWidth; x++) {
              var keyCode = (y * this.state.boardWidth) + x;
              var imageCoords = {startX: x, startY: y,
                                currX: x, currY: y, key: keyCode};
              imagePieces.push(imageCoords);
          }
      }
      let lastIndex = this.state.boardWidth**2 - 1;
      imagePieces[lastIndex].key = -1;
      this.shuffleTiles(imagePieces, img, img.clientWidth, img.clientHeight);
    } else {
      this.shuffleTiles(this.state.tiles, this.state.image, this.state.imageWidth, this.state.imageHeight);
    }
  }

  shuffleTiles(imagePieces, img, imgWidth, imgHeight) {
    var numElements = this.state.boardWidth * this.state.boardWidth - 1;
    for (var i = 0; i < numElements; i++) {
      var shuffleIndex = Math.floor(Math.random() * numElements);
      this.swapTiles(imagePieces, i, shuffleIndex);
    }

    this.setState({
      image: img,
      imageWidth: imgWidth,
      imageHeight: imgHeight,
      puzzleActivated: true,
      tiles: imagePieces,
      moveCount: 0,
    });
  }

  movePieces(event) {
    let newIndex = event.target.id;
    this.move(newIndex);
  }

  getCoordinates(index) {
    let coordinates = new Array(2);
    let xCoord = index % this.state.boardWidth;
    let yCoord = Math.floor(index/this.state.boardWidth);
    coordinates[0] = xCoord;
    coordinates[1] = yCoord;
    return coordinates;
  }

  move(newIndex) {
    let newTiles = this.state.tiles.slice();
    let currentIndex = newTiles.findIndex(image => {
      return (image.key ==  -1);
    });
    if (!this.validMove(newTiles[currentIndex], newTiles[newIndex])) {
      return;
    }
    this.swapTiles(newTiles, newIndex, currentIndex);
    this.state.tiles = newTiles;
    let newNumMoves = this.state.moveCount + 1;
    this.state.moveCount = newNumMoves
    this.setState(this.state);

    // alert("updated state");

    this.checkGameOver();
  }

  checkGameOver() {
    for (let i = 0; i < this.state.tiles.length; i++) {
      let tile = this.state.tiles[i];
      if (tile.currX != tile.startX || tile.currY != tile.startY) {
        return;
      }
    }
    setTimeout(()=> {this.setState ({
                        puzzleActivated: false,
                    }); },
    1000);
  }

  changeWidth(increment) {
    let width;
    if (increment) width = this.state.boardWidth + 1;
    else width = this.state.boardWidth - 1;
    if (width > 10 || width < 3) {
      alert("Sorry, no widths below 3 or above 10.");
      return;
    }
    this.setState({
      puzzleActivated: false,
      boardWidth: width,
    });
  }

  validMove(tile1, tile2) {
    return (tile1.currX == tile2.currX && Math.abs(tile1.currY - tile2.currY) ==1
       || tile1.currY == tile2.currY && Math.abs(tile1.currX - tile2.currX) ==1);
  }

  swapTiles(array, index1, index2) {
        let first = array[index1];
        let firstX = array[index1].currX;
        let firstY = array[index1].currY;
        let second = array[index2];
        let secondX = array[index2].currX;
        let secondY = array[index2].currY;

        array[index1] = second;
        array[index2] = first;
        array[index1].currX = firstX;
        array[index1].currY = firstY;
        array[index2].currX = secondX;
        array[index2].currY = secondY;
  }

  render() {
    return (
      <div className="flex-container">
        <Navbar />
        <div className="board-footer-menu-container">
          <div className="board-footer-container">
            <Board image={this.state.image}
                   imageWidth={this.state.imageWidth}
                   imageHeight={this.state.imageHeight}
                   boardWidth={this.state.boardWidth}
                   activated={this.state.puzzleActivated}
                   tiles={this.state.tiles}
                   onTileClick={this.movePieces} />
            <Footer onShuffle={this.generateTiles}
                    onChangeWidth={this.changeWidth}
                    width={this.state.boardWidth} />
          </div>
          <Menu moveCount={this.state.moveCount}
                solvePuzzle={this.solvePuzzle} />
        </div>
      </div>
    );
  }
}

export default App;
