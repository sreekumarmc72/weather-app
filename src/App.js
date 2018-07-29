import React, { Component } from 'react';
import Box from './Box';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current   :   'Paravur',
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
    };
  }

  render() {
    const Boxes = this.state.cities.map((city) => <Box place={city+',IN'}/>)
    return (
      <div className="App">
        <div className="currentCity"><Box current={true} place={'Paravur,IN'}/></div>
        <div className="allcities">{Boxes}</div>
      </div>
    );
  }
}

export default App;
