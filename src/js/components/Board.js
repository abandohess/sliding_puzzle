import React, { Component } from 'react';
import Square from './Square.js';
import FlipMove from 'react-flip-move';

class Board extends React.Component {

  renderBoard() {
    let whiteTileKey = (this.props.boardWidth*this.props.boardWidth) - 1;
    let visibility;
    if(this.props.activated) {
      return (
        <FlipMove duration="550" easing="cubic-bezier(.12,.36,.14,1.2)">
          {this.props.tiles.map(function(image) {
                let keyCode = (image.currY * this.props.boardWidth) + image.currX;
                // console.log("y: " + image.currY + ", x: " + image.currX + ", code: " + keyCode);
                return ( <Square
                            key={image.key}
                            tileKey={keyCode}
                            image={this.props.image}
                            coordinates={image}
                            imageWidth={this.props.imageWidth}
                            imageHeight={this.props.imageHeight}
                            onClick={this.props.onTileClick}
                            boardWidth={this.props.boardWidth}  /> );
          }, this)}
        </FlipMove>
      );
    } else {
      return (
        <img alt="" src={require("../../img/model_ders.jpg")} className="shadowPicture" id="image" />
      );
    }
  }

  render() {
    return (
      <div className="shadowPicture">
        {this.renderBoard()}
      </div>
    );
  }
}

export default Board;
