import axios from "axios";

const API_URL = "http://localhost:4000/api/post/";

class PostService {
    publish(title, publisher, friendsTags, tags, location) {
        return axios.post(API_URL + "publish", {
            title,
            publisher,
            friendsTags,
            tags,
            location,
        });
    }

    getAllPosts(){
        return axios.get(API_URL + "allPosts");
    }
}

export default new PostService();