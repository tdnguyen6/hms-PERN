import axios from 'axios';

export const login = async (username, password) => {
    let data = {
        email: username,
        password: password
    }
    let res;

    try {
        // show loading
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/user/login`, data);
        return res.data.role;
    } catch (error) {
        if (error.response.status === 401) {
            return null;
        }
    }
}
