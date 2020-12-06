import axios from 'axios';

export const sendResetPasswordLink = async (email) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ADDR}/user/forgetPassword`, {email: email});
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}

export const resetPassword = async (password, token) => {
    try {
        await axios.post(`${process.env.REACT_APP_API_ADDR}/user/resetPassword/${token}`, {password: password});
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}