import React, { Component } from "react";

import UserService from "../services/userService";
import MapContainer from "./mapContainer";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getCurrentUser() ? this.setState({ content: localStorage.getItem('user') }) :
            this.setState({
                content:""
            })

    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    {console.log(this.state.content)}
                    <h3>Fakelock</h3>
                    {/* <MapContainer></MapContainer>   */}         
                </header>
            </div>
        );
    }
}