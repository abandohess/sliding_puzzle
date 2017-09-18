import React, { Component } from 'react';
import '../../css/Menus.css';

class Menu extends React.Component {
  render() {
    return (
      <div className="menu-container">
          <button className="btn orange sideMenuButton" onClick={() => {
                    this.props.solvePuzzle(); }} >
          <span>Solve Puzzle</span></button>
          <button className="btn orange bigZ sideMenuButton" onClick={() => {
                    this.props.onShuffle(true); }} >
          <span>Hint Please</span></button>
          <button className="btn bigZ sideMenuButton noEffect" >
          <span>Move Count: {this.props.moveCount}</span></button>
      </div>
    );
  }
}

export default Menu;
