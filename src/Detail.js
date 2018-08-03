import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import './Detail.css';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit            :   this.props.unit,
      openweathermap  :   {},
      place           :   this.props.place
    };
  }

    componentDidMount() {
        this.getForecastData(this.state.place);
    }

    getForecastData = (place) => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=0af153d7253dd2712e9b724c1bb52b0e`)
            .then(res => {
            this.setState({openweathermap : res.data});
            });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            unit    :   nextProps.unit,
            place   :   nextProps.place
        });
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.place !== prevProps.place) {
            this.getForecastData(this.props.place);
        }
    }

  render() {
    let dayBoxes = '';
    
    if(!_.isEmpty(this.state.openweathermap)) {
        dayBoxes = this.state.openweathermap.list.slice(0, 6).map((daytime) => {
            const imgUrl = `http://openweathermap.org/img/w/${daytime.weather[0].icon}.png`,
                tempMaxKelvin = daytime.main.temp_max,
                tempMinKelvin = daytime.main.temp_min;
            let tempMax = 0,
                tempMin = 0;
            if(this.state.unit === 'c') {
                tempMax = _.floor(tempMaxKelvin - 273.15);
                tempMin = _.floor(tempMinKelvin - 273.15);
            }else {
                tempMax = _.floor(tempMaxKelvin*(9/5)- 459.67);
                tempMin = _.floor(tempMinKelvin*(9/5) - 459.67);
            }
            return (
                <div className="dayBox" key={daytime.dt}>
                    <div className="dayHead">{moment.unix(daytime.dt).format('Do ddd LT')}</div>
                    <img src={imgUrl} />
                    <div className="status">{daytime.weather[0].main}</div>
                    <div className="dayFoot">
                        <span>{tempMax}</span>
                        <span>{tempMin}</span>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className="detailsBox">
            {dayBoxes}
        </div>
    );
  }
}

Detail.propTypes = {
    place  :   PropTypes.string
}

Detail.defaultProps = {
    place  :   'Kochi,IN'
}

export default Detail;
