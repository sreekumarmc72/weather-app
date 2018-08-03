import React, { Component } from 'react';
import Box from './Box';
import Detail from './Detail';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current   :   'Paravur,IN',
      cities    :   [
        'Thiruvananthapuram',
        'Kochi',
        'Calicut',
        'Kollam',
        'Thrissur',
        'Kottayam',
        'Palakkad',
        'Changanassery',
        'Malappuram',
        'Manjeri',
        'Neyyattinkara',
        'Beypore',
        'Nedumangad',
        'Muvattupuzha',
        'Punalur',
        'Cannanore',
        'Tirur',
        'Kasaragod',
        'Kunnamkulam',
        'Ottappalam',
        'Tiruvalla',
        'Adoor',
        'Perinthalmanna',
        'Kottarakara',
        'Kottakkal',
        'Uppala',
        'Pandalam',
        'Mattanur',
        'Chavakkad',
        'Kattappana',
        'Pathanamthitta',
        'Attingal',
        'Paravur',
        'Ramanattukara',
        'Kalamassery',
        'Anchal'
      ],
      unit  :   'c' 
    };
  }

  unitChangeOut = (toUnit) => {
      this.setState({unit : toUnit});
  }

  placeSelectedOut = (place) => {
      this.setState({current : place});
  }

    componentDidUpdate() {
        console.log('componentDidUpdate');
        scroll.scrollToTop();
    }


  render() {
    const Boxes = this.state.cities.map((city) => <Box key={city} place={city+',IN'} onPlaceSelect={this.placeSelectedOut}/>)
    return (
      <div className="App">
        <div className="currentCity"><Box current={true} place={this.state.current} onChangeUnit={this.unitChangeOut}/></div>
        <Detail unit={this.state.unit} place={this.state.current} />
        <div className="allcities">{Boxes}</div>
      </div>
    );
  }
}

export default App;
