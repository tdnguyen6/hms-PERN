import axios from 'axios';
import authorizedUser from "./Authenticated";

export const allAppointment = async () => {
    const user = await authorizedUser();
    console.log(user.role);
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/${user.role}/appointments/all`, { withCredentials: true });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
