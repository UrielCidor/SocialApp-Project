import axios from "axios";

const API_URL = "http://localhost:4000/api/like/";

class LikeService {
    addLike(userId, postId) {
        return axios.post(API_URL + "addLike", {
           userId,
           postId
        });
    }

}

export default new LikeService();