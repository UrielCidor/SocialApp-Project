import axios from "axios";

const API_URL = "http://localhost:4000/api/post/";

class PostService {
    publish(title, publisher, friendsTags, tags, location) {
        let tagsSplit = tags.split(",")
        let tt = [];
        tagsSplit.forEach(t => tt.push(t.trim()))
        console.log(tt);
        return axios.post(API_URL + "publish", {
            title,
            publisher,
            friendsTags,
            tt,
            location,
        });
    }

    getAllPosts(){
        return axios.get(API_URL + "allPosts");
    }

    getAllPostsByDates(startDate, endDate) {
        console.log(startDate, endDate)
        return axios.get(API_URL + `allPostsByDates/?startDate=${startDate}&endDate=${endDate}`)        
    }

    getAllPostsByPublisher(publisherId) {
        return axios.get(API_URL + `allPostsByPublisher/?publisherId=${publisherId}`)
    }
}

export default new PostService();