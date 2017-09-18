import React, { Component } from 'react';
import '../../css/Menus.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">

          <button className="btn orange btn-default" data-dir="dwn" onClick={() => {
                    this.props.onChangeWidth(false); }}><span className="glyphicon glyphicon-minus"></span></button>
          <button className="btn orange bigZ" onClick={() => {
                    this.props.onShuffle(true); }} >
          <span><div>Shuffle</div><div className="smallText">Width: {this.props.width}</div></span></button>

          <button className="btn orange btn-default" data-dir="up" onClick={() => {
                    this.props.onChangeWidth(true); }}><span className="glyphicon glyphicon-plus"></span></button>

      </div>
    );
  }
}

export default Footer;
