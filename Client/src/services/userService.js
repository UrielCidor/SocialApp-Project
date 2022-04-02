import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:4000/api/user/';

class UserService {
    getUser(username) {
        return axios.get(API_URL + `user/?username=${username}`, { headers: authHeader() });
    }
    getCurrentUser() {
        // return JSON.parse(localStorage.getItem('user'));
        return JSON.stringify(localStorage.getItem('user'));
      }
      getUserById(id){
        return axios.get(API_URL + `user/${id}`);

      }
}

export default new UserService();