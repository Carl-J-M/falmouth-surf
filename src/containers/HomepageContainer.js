import React from 'react';
import '../App.css';
import MapDisplay from '../components/MapDisplay';

class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      name: "Falmouth Surf"
    };
    this.initializeSpots = this.initializeSpots.bind(this);
    this.formatData = this.formatData.bind(this);
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
          data: this.formatData(apiData)
        })
      );
  }
  formatData(apiData) {
    const formatted = apiData.map(spot => {
      return [spot.county_name, spot.spot_name, spot.latitude, spot.longitude];
    });
    return formatted;
  }

  render() {
    return <MapDisplay locations={this.state.data} name={this.state.name} />;
  }
}

export default HomepageContainer;