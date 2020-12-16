import axios from "axios";

let Account = {
    get: async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ADDR}/user/account/get`, {}, { withCredentials: true });
            return Promise.resolve(res.data);
        } catch (e) {
            console.log(e);
        }
    },

    update: async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_ADDR}/user/account/update`, data, { withCredentials: true });
            return 0;
        } catch (e) {
            console.log(e);
            return -1;
        }
    }
}

export default Account;