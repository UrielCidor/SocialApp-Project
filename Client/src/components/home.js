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
            radius: null,
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
        let publishers = publishers.trim(",")
        //let tp = publishers.foreach(p => p.trim())
        this.setState({
            publishers
        });
        console.log(this.state.publishers)
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
                        <br/>
                        Date from: <input type="date" onChange={this.onChangeStartDate.bind(this)} />
                        Date to: <input type="date" onChange={this.onChangeEndDate.bind(this)} />
                        Publishers: <input type="text" onChange={this.onChangePublisher.bind(this)} />
                        Radius from current location: <input type="number" onChange={this.onChangeRadius.bind(this)} />
                        Image tags: <input type="text" onChange={this.onChangeImageTags.bind(this)} />
                        Tagged users: <input type="text" onChange={this.onChangeTaggedUsers.bind(this)} />
                    </div>
                    <div><MapContainer searchInfo={this.state.publishers} onCurrentLocationChange={this.handleCurrentLocation.bind(this)} /></div>
                </div>
            </div>
        );
    }
}