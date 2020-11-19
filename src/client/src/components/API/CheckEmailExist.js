import axios from 'axios';

export const checkEmailExist = async (email) => {
  let data = {
    email: email
  }

  let res = await axios.post('http://localhost:3001/user/checkEmailExist', data);
  return res.data.emailStatus;
}
