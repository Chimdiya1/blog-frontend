import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL
if (NODE_ENV === 'development') {
  API_URL = 'http://localhost:5000';
} else {
  API_URL = 'https://limitless-plains-41559.herokuapp.com';
}


class AuthService {
  login(email, password) {
    return axios({
      url: `${API_URL}/auth/login`,
      data: {
        email: email,
        password:password,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ',
      },
      method: 'post',
    }).then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.token));
        return response.data.token;
      } else {
        console.log('error on line 26 in auth.service');
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  signup(username, email, password, confirmPassword) {
    return axios({
      url: `${API_URL}/auth/sign-up`,
      data: {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ',
      },
      method: 'post',
    }).then((response) => {
      if (response.data.status === 400) {
        return {
          err:true,
          errors: response.data.message
        };
      } else {
        return {
          err: false,
          message: response.message,
        };
      }
    });
  }

  async getCurrentUser() {
    const user = await jwt_decode(JSON.stringify(localStorage.getItem('user')));
    return user;
  }
}

export default new AuthService();
