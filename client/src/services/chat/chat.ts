import axios from "axios";
import { endpoints } from "../../constants/chat/chat";

export function createChat(username: string) {
    return axios.post(
        `${process.env.REACT_APP_FLASK_BASE_URL ?? "http://localhost:5000"}${endpoints.create}`,
        { username: username },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } },
    )
}

export function getLatestChat(username: string) {
    return axios.post(
        `${process.env.REACT_APP_FLASK_BASE_URL ?? "http://localhost:5000"}${endpoints.latest}`,
        { username: username },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } },
    )
}