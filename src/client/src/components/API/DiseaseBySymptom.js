import axios from 'axios';

export const diseaseBySymptom = async (listOfSymptoms) => {
    let data = {
        symptoms: listOfSymptoms
    }

    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/disease/findDiseases`, data);
        if (res.data.length === 0)
            return [{id: 0, name: 'No disease found', descriptions: 'You should use general checkup service.'}];
        return res.data;
    } catch (error) {
        if (error.response.status === 400 || error.response.status === 500)
            return [{id: 0, name: 'No disease found'}];
    }
}
