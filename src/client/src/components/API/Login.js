import axios from 'axios';

export const login = async (username, password) => {
  let data = {
    email: username,
    password: password
  }

  let res = await axios.post('http://localhost:3001/user/login', data);
  return res;
}
