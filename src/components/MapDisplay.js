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
    console.log(props.locations);
  } 
  componentDidMount() {
      this.map = L.map('map', {
          center: [58, 16],
          zoom: 6,
          zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          detectRetina: true,
          maxZoom: 20,
          maxNativeZoom: 17,
      }).addTo(this.map);

  }

  
  render() {
    return (
      <>
        <p>{this.props.locations[0]}</p>
        <Wrapper width="100vw" height="420px" id="map" />
      </>
    ); 
  }


}