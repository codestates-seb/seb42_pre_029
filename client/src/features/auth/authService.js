import axios from 'axios';

const API_URL =
  'http://ec2-3-35-235-136.ap-northeast-2.compute.amazonaws.com:8080/';

const signup = async userData => {
  const response = await axios
    .post(API_URL + 'members', userData)
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log(error));

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async userData => {
  const response = await axios
    .post(API_URL + 'auth/login', userData)
    .catch(error => console.log(error));

  console.log(response);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
