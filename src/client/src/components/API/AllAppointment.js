import axios from 'axios';
import {authorizedUser} from "./Authenticated";

export const allAppointment = async () => {
    let data = {
        patientID: null,
        practitionerID: null
    };
    const user = await authorizedUser();
    let res;
    try {
        if (user.role === 'patient') data.patientID = user.patientID;
        else if (user.role === 'practitioner') data.practitionerID = user.practitionerID;
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/${user.role}/appointments/all`, {}, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
