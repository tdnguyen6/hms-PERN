import axios from 'axios';


// finish
// send array of symptomID
// get list of predicted disease
// if error or no disease found (array of length 0) return array of id: 0, name: 'No disease found'
export const diseaseBySymptom = async (listOfSymptoms) => {
    let data = {
        symptoms: listOfSymptoms
    }

    console.log('disease predict input test at api', data.symptoms);

    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/disease/findDiseases`, data);
        console.log('disease returned in api', res.data, res.data.length);
        if (res.data.length === 0) return [{id: 0, name: 'No disease found', descriptions: 'You should use general checkup service.'}];
        return res.data;
    } catch (error) {
        console.log('disease error', error.response.status);
        if (error.response.status === 400 || error.response.status === 500) return [{id: 0, name: 'No disease found'}];
    }
}
