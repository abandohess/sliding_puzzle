import React, { Component } from 'react';
import '../../css/Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" id="opaque-navbar" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button className="hamburger navbar-toggle" data-toggle="collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="../index.html" id="homie"><img src={require("../../img/logo5.png")} id="logo" /></a>
          </div>
          <div className="navbar-collapse collapse" aria-expanded="false">
            <ul className="nav navbar-nav navbar-right">
                <li><a className="toggle-drop" href="../index.html#Home" id="homie"><p id="asbestos" className="lessWhite" href="#Home">Home</p></a></li>
                <li><a className="toggle-drop" href="../index.html#aboutMe" id="aboutie"><p id="asbestos" href="#aboutMe">About</p></a></li>
                <li><a className="toggle-drop" href="../index.html#myPortfolio" id="porty"><p id="asbestos" href="#myPortfolio">Projects</p></a></li>
                <li><a className="toggle-drop" href="../index.html#contactMe" id="conty"><p id="asbestos" href="#contactMe">Contact</p></a></li>
            </ul>
          </div>
          <div className="hideDrawers">
            <div className="menu">
              <ul id="disappear">
                <a href="#Home" className="hamburgerItem" id="homie"><li>Home</li></a>
                <a href="#About" className="hamburgerItem" id="aboutie"><li>About</li></a>
                <a href="#Portfolio" className="hamburgerItem" id="porty"><li>Projects</li></a>
                <a href="#Contact" className="hamburgerItem" id="conty"><li>Contact</li></a>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
