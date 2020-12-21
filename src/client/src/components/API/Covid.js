import axios from 'axios';

export const covid = async () => {
    try {
        let res = await axios.post('https://covid-api.mmediagroup.fr/v1/history?country=Vietnam&status=Confirmed');
        return res;
    } catch (error) {
        console.log(error);
    }
}
