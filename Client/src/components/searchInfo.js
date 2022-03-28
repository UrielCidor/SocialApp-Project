import { Component } from "react";

export default class SearchInfo extends Component{
    constructor(props) {
        super(props)

        this.state = {
/*             startDate: Date, */
            endDate: Date,
            publishers: [],
            radius: null,
            imageTags: "",
            taggedUsers: []
        }
    }

    onChangePublisher(e) {
        let publishers = e.target.value.split(",")
        let tp = [];
        publishers.forEach(p => tp.push(p.trim()))
        console.log(tp);
        this.setState({
            publishers: tp
        });
    }

    onChangeStartDate(e) {
        console.log(e.target.value)
        this.props.onSearchStartDateChange(e.target.value)
    }

    onChangeEndDate(e) {
        console.log(e.target.value)
        this.props.onSearchEndDateChange(e.target.value)
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
        return (
            <div className="container">
                <div className="dashboard">
                    <div>
                        Date from: <input type="date" onChange={this.onChangeStartDate.bind(this)}/>
                        Date to: <input type="date" onChange={this.onChangeEndDate.bind(this)} />
                        Publishers: <input type="text" onChange={this.onChangePublisher.bind(this)} />
                        Radius from current location: <input type="number" onChange={this.onChangeRadius.bind(this)} />
                        Image tags: <input type="text" onChange={this.onChangeImageTags.bind(this)} />
                        Tagged users: <input type="text" onChange={this.onChangeTaggedUsers.bind(this)} />
                    </div>                
                </div>
            </div>
        );
    }
}

