import axios from 'axios';

export const diseaseBySymptom = async (listOfSymptoms) => {
    let data = {
        symptoms: listOfSymptoms
    }

    console.log('disease predict input test at api', data.symptoms);

    let res;
    try {
        res = await axios.post('http://localhost:3001/disease/findDiseases', data);
        console.log('disease returned in api', res.data);
        return res.data;
    } catch (error) {
        console.log('disease error', error.response.status);
        if (error.response.status === 400) return [{id: 0, name: 'No disease found'}];
        else if (error.response.status === 500) return [{id: 0, name: 'No disease found'}];
    }
}
