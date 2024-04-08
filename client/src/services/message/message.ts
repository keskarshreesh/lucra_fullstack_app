import axios from "axios";
import { endpoints } from "../../constants/message/message";

export function get_messages(username: string, chat_id: number) {
    return axios.post(
        `${process.env.REACT_APP_FLASK_BASE_URL ?? "http://localhost:5000"}${endpoints.messages}`,
        { username: username, chat_id: chat_id },
        {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        }
    )
}

export function chat_with_ai(username: string, chat_id: number, user_message: string) {
    return axios.post(
        `${process.env.REACT_APP_FLASK_BASE_URL ?? "http://localhost:5000"}${endpoints.chat_with_ai}`,
        { username: username, chat_id: chat_id, user_message: user_message },
        {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        }
    )
}