import axios from 'axios';

export const checkEmailExist = async (email) => {
  let data = {
    email: email
  }

  let res;
  try {
    res = await axios.post('http://localhost:3001/user/checkEmailExist', data);
    return res.data.emailStatus;
  } catch (error) {
    if (error.response.status === 500) return null;
  }
}
