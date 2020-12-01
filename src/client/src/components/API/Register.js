import axios from 'axios';

export const register = async (name, email, password, phone, sex) => {
  let data = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    gender: sex
  }

  let res;
  try {
    res = await axios.post('http://localhost:3001/user/register', data);
    return res.data.registerStatus;
  } catch (error) {
    if (error.response.status === 500) {
      return null;
    }
  }
}
