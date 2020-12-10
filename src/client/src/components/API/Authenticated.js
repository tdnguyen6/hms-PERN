import axios from 'axios';
import { getCookieValue } from "../Services/Cookie";

const authorizedUser = async () => {
    const sid = getCookieValue('connect.sid');
    if (sid) {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ADDR}/isLogin`, {}, {withCredentials: true});
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
};

export default authorizedUser;
