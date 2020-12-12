import axios from 'axios';
import { getCookieValue } from "../Services/Cookie";

export const authorizedUser = async () => {
    const sessionID = getCookieValue('connect.sid');
    if (sessionID) {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ADDR}/isLogin`, {}, {withCredentials: true});
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
};