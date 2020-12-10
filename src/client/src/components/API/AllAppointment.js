import axios from 'axios';
import authorizedUser from "./Authenticated";

export const allAppointment = async () => {
    const user = await authorizedUser();
    console.log(user.role);
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/appointments/all`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
