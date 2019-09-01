import { citiesData, initialDataPrepare} from './database';

const citiesRU = initialDataPrepare(citiesData);
// size: 0 — Capital
// size: 1 - Small or medium city
// size: 2 — Big city (> 1m population)
const LETTERS = [...Object.keys(citiesRU.bigCities)];
const FORBIDDEN_LETTERS = ['ь', 'ъ', 'ы', 'ф'];

class Computer {
  constructor(lang) {
    this.data = initialDataPrepare(citiesData);
    this.alreadyPlayed = new Set();
    this.recentTurn = {
      city: {},
      lastLetter: ''
    }
  }
  
  answer(firstLetter) {
    const bigCities = this.data.bigCities;
    const cities = this.data.cities;
    let data = [];
    let index = null;
    
    if (!firstLetter) {
      let randomLetter = LETTERS[this.getRandomIndex(LETTERS)];
      // Check if cities are still available on random letter
      while (!cities[randomLetter].length || !bigCities[randomLetter].length) {
        randomLetter = LETTERS[this.getRandomIndex(LETTERS)];
      }
      firstLetter = randomLetter;
    }
    
    if (bigCities[firstLetter].length) {
      index = this.getRandomIndex(bigCities[firstLetter]);
      data = bigCities[firstLetter];
    } else if (cities[firstLetter].length) {
      index = this.getRandomIndex(cities[firstLetter]);
      data = cities[firstLetter];
    } else {
      return false;
    }
    
    const answer = data[index];
    this.recentTurn.city = answer;
    this.defineLastLetter(answer.city);
    this.deleteCity(answer);
    return answer;
  }
  
  checkUserInput(guess) {
    console.log(this.data);
    console.log('Checking ' + guess);
    const firstLetter = guess[0].toUpperCase();
    
    for (let cityObj of this.data.bigCities[firstLetter]) {
      if (cityObj.city.toLowerCase() === guess.toLowerCase()) {
        this.recentTurn = {
          city: cityObj,
          lastLetter: this.defineLastLetter(cityObj.city)
        }
        this.deleteCity(cityObj);
        console.log('big city');
        return true;
      }
    }
    
    for (let cityObj of this.data.cities[firstLetter]) {
      if (cityObj.city.toLowerCase() === guess.toLowerCase()) {
        this.recentTurn = {
          city: cityObj,
          lastLetter: this.defineLastLetter(cityObj.city)
        }
        this.deleteCity(cityObj);
        console.log('small city');
        return true;
      }
    }
    console.log('false works. WTF');
    return false;
  }
  
  deleteCity(cityData) {
    const city = cityData.city;
    this.alreadyPlayed.add(city);
    const firstLetter = city[0].toUpperCase();
    
    if (cityData.size === 1 && !cityData.interest.length) {
      const cities = this.data.cities[firstLetter].filter(cityObj => {
        return cityObj.city !== city;
      });
      this.data.cities[firstLetter] = cities;
    } else {
      const bigCities = this.data.bigCities[firstLetter].filter(cityObj => {
        return cityObj.city !== city;
      });
      this.data.bigCities[firstLetter] = bigCities;
    }
  }
  
  defineLastLetter(city) {
    let index = city.length - 1;
    let lastLetter = city[index];
    
    while (FORBIDDEN_LETTERS.indexOf(lastLetter) !== -1) {
      index--;
      lastLetter = city[index];
    }
    this.recentTurn.lastLetter = lastLetter.toUpperCase();
    return lastLetter.toUpperCase();
  }
  
  getRandomIndex(arr) {
    return Math.floor(Math.random() * (arr.length - 1));
  }
  
}

export default Computer;