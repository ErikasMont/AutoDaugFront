import axios from "axios";

const API_URL = "https://localhost:7168/api";

class AuthService {
    login(username, password) {
        return axios
          .post(API_URL + "/users/token", {username:username, password:password})
          .then(response => {
            if (response.data.token) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
          });
      }
      register(username, password, phoneNumber) {
        return axios
          .post(API_URL + "/users/register", {username:username, password:password, phoneNumber:phoneNumber})
          .then(response => {
            return response.data;
          })
      }
      logout() {
        localStorage.removeItem("user");
        return axios
        .post(API_URL + "/users/logout")
      }
      navigateToDefaultPage(navigate)
      {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user)
        {
          if (!user.isAdmin)
          {
            navigate("/main")
          }
          if (user.isAdmin)
          {
            navigate("/dashboard")
          }
        }
      }
}

export default new AuthService();