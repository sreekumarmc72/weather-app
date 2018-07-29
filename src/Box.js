import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import './Box.css';
import { createSecureContext } from 'tls';

class Box extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit            :   'c',
      openweathermap  :   {},
      place           :   this.props.place,
      currentCity     :   (this.props.current === true)? true : false
    };
  }

  componentDidMount() {

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.place}&appid=0af153d7253dd2712e9b724c1bb52b0e`)
      .then(res => {
        console.log(res.data);
        this.setState({openweathermap : res.data});
      })
  }

  changeUnit = (toUnit) => {
    this.setState({unit : toUnit});
  }

  render() {
    let tempMaxKelvin = 0,
          tempMinKelvin = 0,
          tempMax = 0,
          tempMin = 0,
          mainImg = '01d',
          mainStatus = 'clear sky',
          day = new Date(),
          unit = '',
          humidity = 0,
          pressure = 0,
          wind = 0;

    if(!_.isEmpty(this.state.openweathermap)) {
          tempMaxKelvin = this.state.openweathermap.main.temp_max;
          tempMinKelvin = this.state.openweathermap.main.temp_min;
          mainImg = this.state.openweathermap.weather[0].icon;
          mainStatus = this.state.openweathermap.weather[0].main;
          day = this.state.openweathermap.dt;
          humidity = this.state.openweathermap.main.humidity;
          pressure = this.state.openweathermap.main.pressure;
          wind = this.state.openweathermap.wind.speed;
    }

    if(this.state.unit === 'c') {
      tempMax = _.floor(tempMaxKelvin - 273.15);
      tempMin = _.floor(tempMinKelvin - 273.15);
    }else {
      tempMax = _.floor(tempMaxKelvin*(9/5)- 459.67);
      tempMin = _.floor(tempMinKelvin*(9/5) - 459.67);
    }
    

    const imgSrc = "http://openweathermap.org/img/w/"+mainImg+".png";
    if(this.state.unit === 'c') {
      unit = <div className="unit">
                <span className="selected" onClick={(e) => this.changeUnit('c')}>C</span>|
                <span onClick={(e) => this.changeUnit('f')}>F</span>
              </div>;
    }else {
      unit = <div className="unit">
                <span onClick={(e) => this.changeUnit('c')}>C</span>|
                <span className="selected" onClick={(e) => this.changeUnit('f')}>F</span>
              </div>;
    }
    
    return (
        <div className={this.state.currentCity ? 'mainBox' : 'box'}>
            <div className="head">
              <div className="selected">{mainStatus}</div>
              <div>{this.state.place}</div>
              <div>{moment(day).format('ddd Do hh a')}</div>
            </div>
            <div className="img">
              <img src={imgSrc} alt={mainStatus} />
            </div>
            <div className="temmax">{tempMax}</div>
            <div className="temmin">{tempMin}</div>
            {unit}
            <div className="miscDetails">
              <div>Humidity: {humidity}%</div>
              <div>Pressure: {pressure}hPa</div>
              <div>Wind: {wind}m/s</div>
            </div>
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
