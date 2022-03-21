import React, { Component } from "react";
import './home.css'
import UserService from "../services/userService";
import MapContainer from "./mapContainer";
import NewPost from './newPost';

export default class Home extends Component {
    constructor(props) {
        super(props);
        // this.toggleNewPost = this.toggleNewPost.bind(this);
        this.state = {
            currentUser: null,
            currentLocation: null,
            content: "",
            inNewPost: false,
            publishers: "",
            startDate: "",
            endDate: "",
            radius: null,
            imageTags: [],
            taggedUsers: []
        };
    }

    toggleNewPost() {
        this.setState({ inNewPost: !this.state.inNewPost })
    }

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
        if(this.state.currentUser)
        this.setState({ currentLocation: location })
        else this.setState({currentLocation: null})
    }

    onChangePublisher(e) {
        console.log(e.target.value)
        this.setState({
            publishers: e.target.value
        });
    }

    onChangeStartDate(e) {
        console.log(e.target.value)
        this.setState({
            startDate: e.target.value,
        });
    }

    onChangeEndDate(e) {
        console.log(e.target.value)
        this.setState({
            endDate: e.target.value,
        });
    }

    onChangeRadius(e) {
        console.log(e.target.value)
        this.setState({
            radius: e.target.value,
        });
    }

    onChangeImageTags(e) {
        console.log(e.target.value)
        this.setState({
            imageTags: e.target.value,
        });
    }

    onChangeTaggedUsers(e) {
        console.log(e.target.value)
        this.setState({
            taggedUsers: e.target.value,
        });
    }

    render() {
        // const userName = JSON.parse(localStorage.getItem('user').username);
        console.log(this.state.currentUser);
        console.log(this.state.currentLocation);
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>Fakelock</h3>
                    <h2>hello {this.state.content}</h2>
                </header>

                <div className="dashboard">
                    {this.state.inNewPost &&
                    //  this.state.currentUser ?
                            <NewPost
                                user={this.state.currentUser}
                                location={this.state.currentLocation} 
                                text ="You must be logged-in to publish a post"/> 
                                // : <NewPost text="You must be logged-in to publish a post" />
                                }
                    <div>
                        <input type="button" value="publish new post" onClick={this.toggleNewPost.bind(this)} />
                        <br />
                        Date from: <input type="date" onChange={e => this.onChange(e.target.value.startDate)} />
                        Date to: <input type="date" onChange={e => this.onChange(e.target.value.endDate)} />
                        Publishers: <input type="text" onChange={this.onChangePublisher.bind(this)} />
                        Radius from current location: <input type="number" onChange={e => this.onChange(e.target.value.radius)} />
                        Image tags: <input type="text" onChange={e => this.onChange(e.target.value.imageTags)} />
                        Tagged users: <input type="text" onChange={e => this.onChange(e.target.value.taggedUsers)} />
                    </div>
                    <div><MapContainer searchInfo={this.state.publishers} onCurrentLocationChange={this.handleCurrentLocation.bind(this)} /></div>
                </div>
            </div>
        );
    }
}