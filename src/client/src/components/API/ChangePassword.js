// req.body.newPassword
// app.post("/user/changePassword", auth.changePassword);


import axios from 'axios';

export const changePassword = async (password) => {
    let data = {
        newPassword: password
    };
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/user/changePassword`, data, { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        if (error.response.status === 500) {
            return null;
        }
    }
}
