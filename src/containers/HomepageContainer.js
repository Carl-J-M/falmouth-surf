import React from 'react';
import '../App.css';
import MapDisplay from '../components/MapDisplay';


class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {},
      weather: {},
      name: "Falmouth Surf"
    };
    this.initializeSpots = this.initializeSpots.bind(this);
    this.formatSpots = this.formatSpots.bind(this);
    this.initializeWeatherData = this.initializeWeatherData.bind(this);
    this.formatWeather = this.formatWeather.bind(this);
  }
  componentDidMount() {
    this.initializeSpots();
    
  }

  initializeSpots() {
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
    if (apiData.length > 1) {
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
    return;
  }
  initializeWeatherData(formattedData) {
    return formattedData.map(element => {
      let lat, lon;
      lat = element[2];
      lon = element[3];
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"d0fd620b9c322aa7e3fd301c66012344"}&units=metric`;
      fetch(url)
        .then(res => res.json())
        .then(apiData => {
          this.formatWeather(apiData, element);
        });
    });
  }
  formatWeather(data, element) {
    element.push(data.main.temp);
    element.push(data.wind.speed);
  }
  render() {
    return (
      <MapDisplay locations={this.state.locations} name={this.state.name} />
    );
  }
}

export default HomepageContainer;