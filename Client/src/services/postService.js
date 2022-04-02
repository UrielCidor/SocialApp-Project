import axios from "axios";

const API_URL = "http://localhost:4000/api/post/";

class PostService {
    publish(title, publisher, friendsTags, tags, location, imageUrl) {
        return axios.post(API_URL + "publish", {
            title,
            publisher,
            friendsTags,
            tags,
            location,
            imageUrl
        });
    }

    getAllPosts(){
        return axios.get(API_URL + "allPosts");
    }

    getPostById(id){
        return axios.get(API_URL + `getPost/${id}`);
    }

    getAllPostsBySearches(startDate, endDate, publishers, radius, imageTags, taggedUsers) {
        console.log(startDate, endDate, publishers, radius, imageTags, taggedUsers)
        return axios.post(API_URL + "allPostsBySearches", {
            startDate,
            endDate,
            publishers,
            radius,
            imageTags,
            taggedUsers
        })
    }
}

export default new PostService();