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
            content: "",
            inNewPost: false
        };
    }

    toggleNewPost() {
        this.setState({inNewPost: !this.state.inNewPost})
    }

    componentDidMount() {
        UserService.getCurrentUser() ? this.setState({ content: localStorage.getItem('user') }) :
            this.setState({
                content:""
            })

    }

    render() {
        // const userName = JSON.parse(localStorage.getItem('user').username);
        // console.log(userName);
        return (
            <div className="container">
                <header className="jumbotron">
                    {/* {console.log(this.state.content)} */}
                    <h3>Fakelock</h3>
                    <h2>hello </h2>
                </header>
                <div className="dashboard">
                {this.state.inNewPost && <NewPost user={localStorage.getItem('user')}/>}
                    <div>
                        <input type="button" value="publish new post" onClick={this.toggleNewPost.bind(this)}/>
                    </div>
                    <div><MapContainer/></div>
                </div>
            </div>
        );
    }
}