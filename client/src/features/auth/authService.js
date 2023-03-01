import axios from 'axios';

const signup = async userData => {
  await axios
    .post('/api/members', userData)
    .then(response => {
      console.log(response);
    })
    .catch(error => console.log(error));

  console.log(userData);
};

const login = async userData => {
  const response = await axios
    .post('/api/auth/login', userData)
    .catch(error => console.log(error));

  if (response) {
    const user = {
      memberid: response.headers.memberid,
      authorization: response.headers.authorization,
      refresh: response.headers.refresh,
    };

    console.log(user);
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
