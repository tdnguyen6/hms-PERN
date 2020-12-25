import axios from 'axios';

export const covid = async () => {
    const options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/country',
        params: {name: 'vietnam'},
        headers: {
            'x-rapidapi-key': 'e567e5f04amsh47fb76527b3f726p188cf6jsn97ca1c60b1ed',
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        }
    };

    try {
        let res = axios.get('https://covid-19-data.p.rapidapi.com/country', {
            params: { name: 'vietnam' },
            headers: {
                'x-rapidapi-key': 'e567e5f04amsh47fb76527b3f726p188cf6jsn97ca1c60b1ed',
                'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        }});
        return res;
    } catch (error) {
        console.log(error);
    }
    // .then((response) => {
    //     return response.data[0];
    // }).catch((error) => {
    //     console.error(error);
    // });
    // return res;
}
