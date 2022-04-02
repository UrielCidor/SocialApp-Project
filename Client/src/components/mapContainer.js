import React, { Component } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
import CurrentLocation from './map';
import postService from '../services/postService';
import userService from '../services/userService';
import InfoWindowEx from './InfoWindowEx';
import likeService from '../services/likeService';


export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentPosts: [],
    selectedPost: null,
    message: ""
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
    let post = await postService.getPostById(props.postId);
    let publisherName = await userService.getUserById(post.data.publisher)
    post.data.publisherName = publisherName.data;
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
        activeMarker: null,
        selectedPost: null,
        message: null
      });
    }
  };

  onLikeClick = async (e) => {
    const user = {...JSON.parse(localStorage.getItem('user'))};
    let response = await likeService.addLike(user.id, this.state.selectedPost._id);
    console.log(response);
    this.setState({ message: response.data.message, selectedPost: response.data.post })
  }

  render() {
    console.log(this.state.selectedPost)
    console.log(this.state.message)
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

        <InfoWindowEx
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            {this.state.selectedPost &&
              <div>
                <p>by {this.state.selectedPost.publisherName}</p>
                <img src={this.state.selectedPost.imageUrl} alt="post" style={{ maxHeight: 350, maxWidth: 350 }} />
                <div>
                  <p>tags: {this.state.selectedPost.tags}</p>
                  <p>likes: {this.state.selectedPost.likes.length}</p>
                </div>
                <div style={{color: "red", size:24}}>
                  {this.state.message}
                </div>
                <button onClick={this.onLikeClick}>Like ❤️</button>
                <button>comment</button>
              </div>
            }
          </div>
        </InfoWindowEx>
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyDZQyl9bEj2jljuHiPS4TsfL5V4usG7ni4'
  }
  ))(MapContainer)

