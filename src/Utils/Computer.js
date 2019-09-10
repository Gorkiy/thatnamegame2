import { citiesData, initialDataPrepare, cityAliases} from './database';

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
    const firstLetter = guess[0].toUpperCase();
    const isAlias = this.checkAlias(guess);
    guess = isAlias ? isAlias : guess;
    
    if (this.checkMatch(this.data.bigCities[firstLetter], guess)) return true;
    if (this.checkMatch(this.data.cities[firstLetter], guess)) return true;
    return false;
  }
  
  checkMatch(dataOnLetter, guess) {
    for (let cityObj of dataOnLetter) {
      if (cityObj.city.toLowerCase() === guess.toLowerCase()) {
        this.recentTurn = {
          city: cityObj,
          lastLetter: this.defineLastLetter(cityObj.city)
        }
        this.deleteCity(cityObj);
        return true;
      }
    }
  }
  
  checkAlias(guess) {
    for (let city of cityAliases) {
      if (city.alias.toLowerCase() === guess.toLowerCase()) {
        return city.original;
      }
    }
    return null;
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