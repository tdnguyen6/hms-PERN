import axios from 'axios';

export const checkEmailExist = async (email) => {
  let data = {
    email: email
  }

  let res;
  try {
    res = await axios.post(`${process.env.REACT_APP_API_ADDR}/user/checkEmailExist`, data);
    return res.data.emailStatus;
  } catch (error) {
    if (error.response.status === 500) return null;
  }
}
