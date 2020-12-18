import axios from 'axios';

export const diseaseBySymptom = async (listOfSymptoms) => {
    let data = {
        symptoms: listOfSymptoms
    }

    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/disease/findDiseases`, data);
        if (res.data.length)
            return res.data;
        else
            return fallback();
    } catch (error) {
        if (error.response.status === 400 || error.response.status === 500) {
            return fallback();
        }
    }
}

const fallback = async () => {
    const generalCheckup = await axios.post(`${process.env.REACT_APP_API_ADDR}/medicalServices/general-checkup`, {});
    return [
        {
            id: generalCheckup.data.id,
            disease: 'No known disease found',
            descriptions: 'Sorry. We have never encountered any disease with this combination of symptoms.',
            medical_service: generalCheckup.data.name,
            price: generalCheckup.data.price
        }];
}
