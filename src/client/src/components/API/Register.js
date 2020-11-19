import axios from 'axios';

export const register = async (name, email, password, phone) => {
  let data = {
    name: name,
    email: email,
    password: password,
    phone: phone
  }

  let res = await axios.post('http://localhost:3001/user/login', data);
  return res.data.loginStatus;
}
