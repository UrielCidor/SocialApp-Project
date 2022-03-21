import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Circle } from 'google-maps-react';

import CurrentLocation from './map';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    //dummy posts
    const CrazyHumanLakeCoords = { lat: -21.805149, lng: -49.0921657 };
    const PostJerusalem1Coords = { lat: 31.7759335, lng: 35.2186382 };
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      console.log(coords.latitude, coords.longitude);
      this.props.currentLocation = coords;
    });

    return (
      <CurrentLocation
      // {...console.log(this.centerAroundCurrentLocation)}
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={this.props.searchInfo} />
        <Marker
          onClick={this.onMarkerClick}
          name={'Post1'}
          position={{ lat: 32.0596261, lng: 34.7590195 }} />
        <Marker
          onClick={this.onMarkerClick}
          name={'Post2'}
          position={PostJerusalem1Coords} />
        <Circle
          radius={1200}
          center={CrazyHumanLakeCoords}
          onMouseover={() => console.log('mouseover')}
          onClick={() => console.log('click')}
          onMouseout={() => console.log('mouseout')}
          strokeColor='transparent'
          strokeOpacity={0}
          strokeWeight={5}
          fillColor='#FF0000'
          fillOpacity={0.2}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyDZQyl9bEj2jljuHiPS4TsfL5V4usG7ni4'
  }
  ))(MapContainer)  