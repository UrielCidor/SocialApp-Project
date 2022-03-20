import axios from "axios";

const API_URL = "http://localhost:4000/api/post/";

class PostService {
    publish(title, publisher, text, tags, location) {
        return axios.post(API_URL + "publish", {
            title,
            publisher,
            text,
            tags,
            location
        });
    }
}

export default new PostService();