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
        markers: []
    }
    this.addMarkers = this.addMarkers.bind(this);
    this.getColor = this.getColor.bind(this);
  } 
  componentDidMount() {
      this.map = L.map('map', {
          center: [35, -120],
          zoom: 8,
          zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          detectRetina: true,
          maxZoom: 20,
          maxNativeZoom: 17,
      }).addTo(this.map);

      

     
            
  }
  addMarkers() {
     if (this.props.locations.length > 1) {
        this.props.locations.forEach(element => {
            console.log("addmarkers location", element);
                            var circle = L.circle([element[2], element[3]], {
                            color: this.getColor(element[4]),
                            fillColor: "white",
                            fillOpacity: 0.5,
                            radius: 800
                          }).addTo(this.map);
        });
     }
        
  }
  getColor(temperature) {
    console.log("getColor", temperature);
}
  
  render() {
      this.addMarkers(); 
    return (
      <>
        <p>{this.props.name}</p>
        <Wrapper width="100vw" height="820px" id="map" />
      </>
    ); 
  }


}
