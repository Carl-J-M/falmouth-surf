import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper =  styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;


export default class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
        searchRange: {
          max: 10,
          min: 0
        }
    }
    this.addMarkers = this.addMarkers.bind(this);
    this.getColor = this.getColor.bind(this);
    this.resetMarkers = this.resetMarkers.bind(this);
  } 
  componentDidMount() {
      this.map = L.map('map', {
          center: [35, -120],
          zoom: 6,
          zoomControl: false
      });

      L.tileLayer(
        "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png",
        {
          detectRetina: true,
          maxZoom: 20,
          maxNativeZoom: 17
        }
      ).addTo(this.map);

      

     
            
  }
  addMarkers() {
     if (this.props.locations.length > 1) {
        this.props.locations.forEach(element => {

                            var circle = L.circle([element[2], element[3]], {
                            color: this.getColor(element[5]),
                            fillColor: this.getColor(element[5]),
                            fillOpacity: 0.5,
                            radius: 800
                          }).addTo(this.map);
        });
     }
        
  }
  getColor(metersSecondWind) {
    const knots = metersSecondWind *= 1.94384

    if (knots >= this.state.searchRange.max) {
      return "red"
    }
    if (knots < this.state.searchRange.max) {
      return "blue"
    } 
}
  resetMarkers(skillLevel) {
    if (skillLevel === 1) {
        this.setState({
          searchRange: {
            max: 10
          }
        })
    }
    if (skillLevel === 2) {
        this.setState({
          searchRange: {
            max: 20
          }
        })
    }
    if (skillLevel === 3) {
        this.setState({
          searchRange: {
            max: 30
          }
        })
    }

}
  
  render() {
      this.addMarkers(); 
    return (
      <>
        <h1 className="pageTitle">{this.props.name}</h1>
        <div className="selectionBox">
          <div className="easy selection" onClick={() => this.resetMarkers(1)}>
            NOVICE
          </div>
          <div className="medium selection" onClick={() => this.resetMarkers(2)}>
            INTERMEDIATE
          </div>
          <div className="hard selection" onClick={() => this.resetMarkers(3)}>
            EXPERT
          </div>
        </div>
        <Wrapper width="100vw" height="600px" id="map" />
        <div className="instructionContainer">
          <h3>KEY: Wind Speed</h3>
          <div>
            <a className="red">O</a> {this.state.searchRange.max}+ Knots
          </div>
          <div>
            <a className="blue">O</a> {this.state.searchRange.max}- Knots
          </div>
        </div>
      </>
    ); 
  }


}
