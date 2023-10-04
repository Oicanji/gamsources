import axios from "axios";
import { HOST } from ".";

const USER_ROUTE = HOST + "/user";

const register = (username, password, email) => {
    return axios.post(USER_ROUTE + "/register", {
        username: username,
        password: password,
        email: email
    });
}
const login = (username, password) => {
    return axios.post(USER_ROUTE + "/login", {
        user: username,
        password: password
    });
}

const refresh = (refreshToken) => {
    //send in authorization header
    return axios.post(USER_ROUTE + "/refresh", null, {
        headers: {
          Authorization: "Bearer " + refreshToken
        }
      }
    );
}

const logout = (auth) => {
  return axios.post(USER_ROUTE + "/logout", null, {
    headers: {
      Authorization: "Bearer " + auth
    }
  });
}

const apiUser = {
    register, login,
    refresh, logout
}

export default apiUser;