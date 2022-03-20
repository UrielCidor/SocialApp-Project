import React, { Component } from "react";
import './home.css'
import UserService from "../services/userService";
import MapContainer from "./mapContainer";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
        };
    }

    componentDidMount() {
        UserService.getCurrentUser() ? this.setState({ content: localStorage.getItem('user') }) :
            this.setState({
                content:""
            })
    }

    onChange(e) {
        this.setState({
            startDate: e.target.value,
            endDate: e.target.value,
            publishers: e.target.value,
            radius: e.target.value,
            imageTags: e.target.value,
            taggedUsers: e.target.value
        });
      }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    {console.log(this.state.content)}
                    <h2>Fakelock</h2> 
                    {/* <h3>Menu</h3> */}
                </header>
                <div className="dashboard">
                    <div>           
                    Date from: <input type="date" onChange={e => this.onChange(e.target.value.startDate)}/> 
                    Date to: <input type="date" onChange={e => this.onChange(e.target.value.endDate)}/> 
                    Publishers: <input type="text" onChange={e => this.onChange(e.target.value.publishers)}/>
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