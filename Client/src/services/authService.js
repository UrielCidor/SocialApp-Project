import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/";

class AuthService {
  async login(username, password) {
    const response = await axios
      .post(API_URL + "signin", {
        username,
        password
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  resetPassword(username, password){
    return axios.put(API_URL + "reset", {
      username,
      password
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  forgotPassword(username) {
    return axios.get(API_URL + `forgot/?username=${username}`);
}
}

export default new AuthService();