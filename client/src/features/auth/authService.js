import axios from 'axios';

const signup = async userData => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/members`, userData)
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log(error));
};

const login = async userData => {
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login`, userData)
    .catch(error => console.log(error));

  if (response) {
    const user = {
      memberid: response.headers.memberid,
      authorization: response.headers.authorization,
      refresh: response.headers.refresh,
    };

    localStorage.setItem('user', JSON.stringify(user));

    return user;
  }
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
