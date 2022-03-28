import React, { Component } from "react";
import './home.css'
import UserService from "../services/userService";
import MapContainer from "./mapContainer";
import NewPost from './newPost';
import SearchInfo from "./searchInfo";

export default class Home extends Component {
    constructor(props) {
        super(props);
        // this.toggleNewPost = this.toggleNewPost.bind(this);
        this.state = {
            currentUser: null,
            currentLocation: null,
            content: "",
            inNewPost: false,
            searchStartDate: null,
            searchEndDate: null
        };
    }

    handleOpenNewPost = () => { this.setState({ inNewPost: true }) };
    handleCloseNewPost = () => { this.setState({ inNewPost: false }) };

    componentDidMount() {
        if (UserService.getCurrentUser() !== "null") {
            const user = { ...JSON.parse(localStorage.getItem('user')) };
            this.setState({ currentUser: user, content: user.username })
        } else {
            this.setState({
                content: "please login or register"
            })
        }
    }

    handleCurrentLocation(location) {
        console.log(location);
        if (this.state.currentUser)
            this.setState({ currentLocation: location })
        else this.setState({ currentLocation: null })
    }

    handleSearchStartDate(e) {
        console.log(e)
        this.setState({searchStartDate: e})
    }

    handleSearchEndDate(e) {
        console.log(e)
        this.setState({searchEndDate: e})
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>Fakelock</h3>
                    <h2>hello {this.state.content}</h2>
                </header>
                <div className="dashboard">
                    <div>
                        <button className="btn btn-primary" variant="primary" onClick={this.handleOpenNewPost.bind(this)}>
                            publish new post
                        </button>
                        <NewPost
                            user={this.state.currentUser}
                            location={this.state.currentLocation}
                            inNewPost={this.state.inNewPost}
                            handleCloseNewPost={this.handleCloseNewPost.bind(this)}
                        />
                    </div>
                    <div>
                    <MapContainer 
                    onCurrentLocationChange={this.handleCurrentLocation.bind(this)} 
                    searchStartDate={this.state.searchStartDate} 
                    searchEndDate={this.state.searchEndDate}
                    onChange={this.handleSearchStartDate && this.handleSearchEndDate}/>
                    </div>
                    <div>
                    <SearchInfo 
                    searchStartDate={this.state.searchStartDate} 
                    onSearchStartDateChange={this.handleSearchStartDate.bind(this)} 
                    onSearchEndDateChange={this.handleSearchEndDate.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}