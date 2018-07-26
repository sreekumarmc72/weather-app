import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Box.css';

class Box extends Component {

  componentDidMount() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=kochi,in&appid=0af153d7253dd2712e9b724c1bb52b0e`)
      .then(res => {
        console.log(res.data);
      })
  }

  render() {
    return (
        <div className="box">
            <div className="day">WED - {this.props.date}</div>
            <div className="img">RAIN</div>
            <div className="temmax">30</div>
            <div className="temmin">20</div>
      </div>
    );
  }
}

Box.propTypes = {
  date  :   PropTypes.string
}

Box.defaultProps = {
  date  :   '26-07-2018'
}

export default Box;
