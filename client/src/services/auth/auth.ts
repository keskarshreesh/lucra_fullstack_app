import axios from 'axios';
import { endpoints } from '../../constants/auth/auth';
import { LoginDetails, SignupDetails } from '../../types/auth/auth';

export const signup = (signupDetails: SignupDetails) => {

    const { firstname, lastname, username, email, password } = signupDetails;

    return axios.post(`${process.env.REACT_APP_FLASK_BASE_URL ?? "http://localhost:5000"}${endpoints.signup}`,{
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
    })
};

export const login = (loginDetails: LoginDetails) => {

    const { username, password } = loginDetails;

    return axios.post(`${process.env.REACT_APP_FLASK_BASE_URL ?? "http://localhost:5000"}${endpoints.login}`, {
        username: username,
        password: password,
    });
};

export const fetchUserByAccessToken = () => {

    return axios.get(`${process.env.REACT_APP_FLASK_BASE_URL ?? "http://localhost:5000"}${endpoints.user}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    });
}