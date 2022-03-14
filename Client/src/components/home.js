import React, { Component } from "react";

import UserService from "../services/authService";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        // UserService.getCurrentUser().then(
        //   response => {
        //     this.setState({
        //       content: response.data
        //     });
        //   },
        //   error => {
        //     this.setState({
        //       content:
        //         (error.response && error.response.data) ||
        //         error.message ||
        //         error.toString()
        //     });
        //   }
        // );
        UserService.getCurrentUser() ? this.setState({ content: UserService.getCurrentUser() }) :
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
                </header>
            </div>
        );
    }
}