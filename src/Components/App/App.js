import React, { Component } from 'react';
import UserInput from '../UserInput/UserInput'
import './App.css';
const citiesData = require('./cities-ru.json');

class App extends Component {
  state = {
    cities: [],
    bigCities: [],
    playedCities: new Set()
  }
  
  componentDidMount() {
    // console.log(cities[253]);
    this.initialDataPrepare(citiesData);
  }
  
  onFormSubmit(term) {
    console.log(term);
  }
  
  initialDataPrepare(data) {
    const cities = [];
    const bigCities = [];
    
    function helper(arr, cityObj) {
      const firstLetter = cityObj.city[0].toUpperCase();      
      if (!arr[firstLetter]) {
        arr[firstLetter] = [];
        arr[firstLetter].push(cityObj);
      } else {
        arr[firstLetter].push(cityObj);
      }
    }
    
    data.forEach(city => {
      if (city.size !== 1 || city.interest) {
        helper(bigCities, city);
      } else {
        helper(cities, city);
      }
    })
    console.log(bigCities);
    console.log(cities);
  }
  
  render() {
    return (
      <div>
        <UserInput onSubmit={this.onFormSubmit}/>
      </div>
    );
  }
}

export default App;
