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
            inNewPost: false,
            publishers:"",
            startDate: "",
            endDate: "",
            radius: null,
            imageTags: [],
            taggedUsers: []
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
        // console.log(this.startDate);
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

                    <div>           
                    Date from: <input type="date" onChange={this.onChangeStartDate.bind(this)}/> 
                    Date to: <input type="date" onChange={this.onChangeEndDate.bind(this)}/> 
                    Publishers: <input type="text" onChange={this.onChangePublisher.bind(this)}/>
                    Radius from current location: <input type="number" onChange={this.onChangeRadius.bind(this)}/>
                    Image tags: <input type="text" onChange={this.onChangeImageTags.bind(this)}/>
                    Tagged users: <input type="text" onChange={this.onChangeTaggedUsers.bind(this)}/>
                </div>
                <div><MapContainer searchInfo={this.state.publishers}/></div> 
                </div>                          
            </div>
        );
    }
}