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
            publisher:""
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
            // startDate: e.target.value,
            // endDate: e.target.value,
            publishers: e.target.value
            // radius: e.target.value,
            // imageTags: e.target.value,
            // taggedUsers: e.target.value
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
                    Date from: <input type="date" onChange={e => this.onChange(e.target.value.startDate)}/> 
                    Date to: <input type="date" onChange={e => this.onChange(e.target.value.endDate)}/> 
                    Publishers: <input type="text" onChange={this.onChangePublisher.bind(this)}/>
                    Radius from current location: <input type="number" onChange={e => this.onChange(e.target.value.radius)}/>
                    Image tags: <input type="text" onChange={e => this.onChange(e.target.value.imageTags)}/>
                    Tagged users: <input type="text" onChange={e => this.onChange(e.target.value.taggedUsers)}/>
                </div>
                <div><MapContainer/></div> 
                </div>                          
            </div>
        );
    }
}