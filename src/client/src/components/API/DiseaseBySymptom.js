import axios from 'axios';

export const diseaseBySymptom = async (listOfSymptoms) => {
    let data = {
        symptoms: listOfSymptoms.substring(0, listOfSymptoms.length - 1).split(' ')
    }

    console.log('disease predict input test at api', data.symptoms);

    let res;
    try {
        res = await axios.post('http://localhost:3001/disease/findDiseases', data);
        return res.data;
    } catch (error) {
        if (error.response.status === 500 || error.response.status === 400) return null;
    }
}
