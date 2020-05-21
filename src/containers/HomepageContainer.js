import React from 'react';
import '../App.css';
import MapDisplay from '../components/MapDisplay';
import { arrayExpression } from '@babel/types';


class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {},
      weather: {},
      name: "WAVECHASER"
    };
    this.initializeSpots = this.initializeSpots.bind(this);
    this.formatSpots = this.formatSpots.bind(this);
    this.initializeWeatherData = this.initializeWeatherData.bind(this);
    this.formatWeather = this.formatWeather.bind(this);
  }
  componentDidMount() {
    this.initializeSpots();
    
  }

  initializeSpots() { // gets surfing locations 
    const url =
      "https://cors-anywhere.herokuapp.com/https://s3.eu-west-2.amazonaws.com/lpad-public-assets/software-test/all-spots.json";
    fetch(url)
      .then(res => res.json())
      .then(apiData =>
        this.setState({
          locations: this.formatSpots(apiData)
        })
      );
  }
  formatSpots(apiData) {  
      const formatted = apiData.map(spot => {
        return [
          spot.county_name,
          spot.spot_name,
          spot.latitude,
          spot.longitude
        ];
      });
      this.initializeWeatherData(formatted);
      return formatted;
  }
  initializeWeatherData(formattedData) {
    const array = [];
    const weatherLocations = formattedData.map(element => {
      let newEl;
      let lat, lon;
      lat = element[2];
      lon = element[3];
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"d0fd620b9c322aa7e3fd301c66012344"}&units=metric`;
      fetch(url)
        .then(res => res.json())
        .then(apiData => {
          this.formatWeather(apiData, element);
          newEl = element;
          console.log("newEl", newEl);
          array.push(newEl);
        })
        .then(val => {
         this.setState({
          weather: array
         })
        })
    });

   
  }
  formatWeather(data, element) {
    if(data.main.temp) {
          element.push(data.main.temp);
    }
    if(data.wind.speed) {
        element.push(data.wind.speed);
    }  
  }
  render() {
    return (
      <MapDisplay locations={this.state.weather} name={this.state.name} />
    );
  }
}

export default HomepageContainer;