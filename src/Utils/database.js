export const citiesData = require('./cities-ru.json');

export function initialDataPrepare(data) {
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
  return { bigCities, cities };
}