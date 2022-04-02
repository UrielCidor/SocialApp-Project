import { Component } from "react";
import postService from "../services/postService";

export default class SearchInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startDate: "",
            endDate: "",
            publishers: "",
            radius: 0,
            imageTags: "",
            taggedUsers: [],
        }
    }

    onChangePublisher(e) {
        this.setState({
            publishers: e.target.value
        });
    }

    onChangeStartDate(e) {
        console.log(e.target.value)
        this.setState({
            startDate: e.target.value
        })
    }

    onChangeEndDate(e) {
        console.log(e.target.value)
        this.setState({
            endDate: e.target.value
        })
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

    async handleSearchButton(e) {
        let publishers = this.state.publishers.split(",")
        let imageTags = this.state.imageTags.split(",")
        let tp = [];
        let tit = []
        publishers.forEach(p => tp.push(p.trim()))
        imageTags.forEach(p => tit.push(p.trim()))
        console.log(tp);
        console.log(tit);
        const filteredPosts = await postService.getAllPostsBySearches(
            this.state.startDate,
            this.state.endDate,
            tp,
            this.state.radius,
            tit,
            this.state.taggedUsers
        )
        console.log(filteredPosts.data)
        this.props.onChangeSearchResults(filteredPosts.data)
    }

    render() {
        return (
            <div className="container">
                <div className="dashboard">
                    <div>
                        Date from: <input type="date" onChange={this.onChangeStartDate.bind(this)} value={this.state.startDate} />
                        Date to: <input type="date" onChange={this.onChangeEndDate.bind(this)} value={this.state.endDate} />
                        Publishers: <input type="text" onChange={this.onChangePublisher.bind(this)} value={this.state.publishers} />
                        Radius from current location: <input type="number" onChange={this.onChangeRadius.bind(this)} value={this.state.radius} />
                        Image tags: <input type="text" onChange={this.onChangeImageTags.bind(this)} value={this.state.imageTags} />
                        Tagged users: <input type="text" onChange={this.onChangeTaggedUsers.bind(this)} value={this.state.taggedUsers} />
                    </div>
                </div>
                <button onClick={this.handleSearchButton.bind(this)}>Search</button>
            </div>
        );
    }
}

