import axios from 'axios';
import { getCookieValue } from "../Services/Cookie";

const authorizedUser = async () => {
    const sid = getCookieValue('connect.sid');
    if (sid) {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ADDR}/user/isLogin`, {}, {withCredentials: true});
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
};

export default authorizedUser;
