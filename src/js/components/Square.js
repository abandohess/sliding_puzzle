import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
  componentDidMount() {
    if (this.props.tileKey != (this.props.boardWidth**2 - 1)) {
      let context = ReactDOM.findDOMNode(this).getContext('2d');
      this.drawImage(context);
    }
  }

  drawImage(context) {
    let pieceWidth = this.props.image.naturalWidth/this.props.boardWidth;
    let pieceHeight = this.props.image.naturalHeight/this.props.boardWidth;
    let realWidth = this.props.imageWidth/this.props.boardWidth;
    let realHeight = this.props.imageHeight/this.props.boardWidth;
    context.drawImage(
            this.props.image,
            this.props.coordinates.startX * pieceWidth,
            this.props.coordinates.startY * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            realWidth,
            realHeight
        );
  }

  render() {
    // console.log("ID: " + this.props.tileKey);
    return (
      <canvas
        width={this.props.imageWidth/this.props.boardWidth - 2}
        height={this.props.imageHeight/this.props.boardWidth}
        onClick={(e) => { this.props.onClick(e); }}
        id={this.props.tileKey}
        className="tile" />
    );
  }
}

export default Square;
