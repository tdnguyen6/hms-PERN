import axios from 'axios';

export const sendResetPasswordLink = async (email) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ADDR}/user/forgetPassword`, {email: email});
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}

export const resetPassword = async (email, password) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ADDR}/user/resetPassword`, {
            email: email,
            password: password
        });
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}

export const verifyJWT = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_ADDR}/verify-jwt`, {jwtToken: token});
            resolve(res.data);
        } catch (e) {
            reject(e.response.data.error);
        }
    });
}