import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import userService from '../services/userService';
import CurrentLocation from './map';
import postService from '../services/postService';
export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentPosts: this.props.searchResults,
    selectedPost: null,
  };

  componentDidMount() {
    console.log("rendered")
    console.log(this.state.currentPosts)
    navigator.geolocation.getCurrentPosition(pos => {
      const currentLocation = pos.coords;
      this.props.onCurrentLocationChange(currentLocation);
      console.log(currentLocation)
      console.log(this.props.searchResults)
      if (this.state.currentPosts.length < 1) {
        postService.getAllPosts().then(
          (posts) => {
            this.setState({ currentPosts: posts.data });
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
      }
    //   if(this.props.searchResults === undefined || this.props.searchResults.length < 1){
    //   postService.getAllPosts().then(
    //     (posts) => {
    //       this.setState({ currentPosts: posts.data });
    //     },
    //     error => {
    //       const resMessage =
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString();
    //       console.log(resMessage);
    //     }
    //   );
    // }
    // else {
    //   this.setState({
    //     currentPosts: this.props.searchResults
    //   })
    // }
  }
)}

onSearchResultsChange(searchResults){
  this.setState({
    currentPosts: searchResults
  })
}

  onMarkerClick = async (props, marker, e) => {
    console.log(props.postId)
    let post = await postService.getPostById(props.postId);
    console.log(post)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      selectedPost: post.data
    })
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    console.log(this.props.searchResults)
    console.log(this.state.currentPosts)
    return (
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        {this.state.currentPosts.length > 0 && this.state.currentPosts.map(p =>
          <Marker
            onClick={this.onMarkerClick}
            key={p._id} name={p.title} postId={p._id}
            position={{ lat: p.location.latitude, lng: p.location.longitude }}
            icon={{
              url: p.imageUrl,
              scaledSize: new this.props.google.maps.Size(64, 64)
            }}
          />
        )}
        <Marker onClick={this.onMarkerClick} name={"current location"} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            {this.state.selectedPost &&
              <div>
                <img src={this.state.selectedPost.imageUrl} style={{ maxHeight: 350, maxWidth: 350 }} />
                <div>
                  <p>tags: {this.state.selectedPost.tags}</p>
                  <p>likes: {this.state.selectedPost.likes.length}</p>
                </div>
                <button>Like ❤️</button>
                <button>comment</button>
              </div>
            }
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