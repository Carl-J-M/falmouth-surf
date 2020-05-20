import React from 'react';
import '../App.css';
import MapDisplay from '../components/MapDisplay';


class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {},
      name: "Falmouth Surf"
    };
    this.initializeSpots = this.initializeSpots.bind(this);
    this.formatData = this.formatData.bind(this);
    this.getWeatherData = this.getWeatherData.bind(this);
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
          locations: this.formatData(apiData)
        })
      );
  }
  getWeatherData(formattedData) {
    formattedData.forEach(element => {
        let lat,lon;
        lat = element[2];
        lon = element[3];
        let url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"d0fd620b9c322aa7e3fd301c66012344"}`;
        console.log(url);
    });
  }

  formatData(apiData) {
      if (apiData.length > 1) {
        const formatted = apiData.map(spot => {
          return [
            spot.county_name,
            spot.spot_name,
            spot.latitude,
            spot.longitude
          ];
        });
        return formatted;
    }
    return "No data!"
  }

  render() {
              if (this.state.locations.length > 1) {
                  console.log("this.state.loc:", this.state.locations)
                this.getWeatherData(this.state.locations);
              }
    return <MapDisplay locations={this.state.locations} name={this.state.name} />;
  }

}

export default HomepageContainer;