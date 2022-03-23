import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Circle } from 'google-maps-react';
// import userService from '../services/userService';
import CurrentLocation from './map';
import postService from '../services/postService';


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentPosts: []
  };

  componentDidMount() {
    console.log(this.state.currentPosts)
    navigator.geolocation.getCurrentPosition(pos => {
      const currentLocation = pos.coords;
      this.props.onCurrentLocationChange(currentLocation);

      postService.getAllPosts().then(
        (posts) => {
          console.log(posts.data)
          this.setState({currentPosts: posts.data})
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );

    });
  }
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
    return(
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        {console.log(this.state.currentPosts)}
        {this.state.currentPosts.length > 0 && this.state.currentPosts.map(p=>{ return <Marker onClick={this.onMarkerClick} key={p._id} name={p.title} position={{lat:p.location.latitude, lng:p.location.longitude}}/>})}
        <Marker onClick={this.onMarkerClick} name={"current location"} />
        <Marker
          onClick={this.onMarkerClick}
          name={'Post1'}
          position={{ lat: 32.0596261, lng: 34.7590195 }} />
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
    )
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyDZQyl9bEj2jljuHiPS4TsfL5V4usG7ni4'
  }
  ))(MapContainer)  