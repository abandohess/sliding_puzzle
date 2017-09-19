class State {
  constructor(value, board, emptyRow, emptyCol, depth) {
    this.value = value;
    this.board = board;
    this.emptyCol = emptyCol;
    this.emptyRow = emptyRow;
    this.depth = depth;
    this.strRepresentation = "";
    this.path = "";
    this.size = this.board.length;

    this.createString(board);
  }

  createString(board) {
    this.strRepresentation = "";
    // String representation of the state in CSV format
    for (var i = 0; i < board.length; i++) {
       // We assume the state is a square
       if (board[i].length != board.length) {
          alert('Number of rows differs from number of columns');
       }
       for (var j = 0; j < board[i].length; j++)
         this.strRepresentation += board[i][j] + ",";
    }
  }
}

export default State;
