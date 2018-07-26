import React, { Component } from 'react';
import './Box.css';

class Box extends Component {
  render() {
    return (
        <div className="box">
            <div className="day">WED</div>
            <div className="img">RAIN</div>
            <div className="temmax">30</div>
            <div className="temmin">20</div>
      </div>
    );
  }
}

export default Box;
