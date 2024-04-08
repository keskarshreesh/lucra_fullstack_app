import os
import requests
from typing import List
from dotenv import load_dotenv
from transformers import AutoTokenizer

from server.entity.message import Message
from server.dto.message import MessageDTO
from server.database import db

class MessageService:
    def __init__(self) -> None:
        load_dotenv()
        self.model = os.getenv("HF_CHAT_MODEL")
        self.tokenizer = AutoTokenizer.from_pretrained(self.model)
        self.hf_api_token = os.getenv("HF_API_TOKEN")
        self.api_url = f"{os.getenv("HF_CHAT_BASE_URL")}{self.model}"
        self.messages = []
    
    def getMessagesByChatId(self,chat_id:int) -> List[dict]:
        messages = db.session().query(Message).filter_by(chat_id=chat_id).order_by(Message.created_at)
        self.messages = [{"role": message.chat_role, "content": message.message} for message in messages]
        return [MessageDTO(message).to_dict() for message in messages]
    
    def addNewMessage(self,role:str,message:str,chat_id:int) -> None:
        new_message = Message(
            message=message,
            chat_role=role,
            chat_id=chat_id,
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message
    
    def getMessageResponse(self,user_message:str,chat_id:int) -> MessageDTO:
        self.messages.append({"role": "user", "content": user_message})
        self.addNewMessage("user",user_message,chat_id)
        encoded_input = self.tokenizer.apply_chat_template(self.messages, tokenize=False)
        response = self.getHFChatResponse(encoded_input)
        if response.status_code == 200:
            generation = response.json()
            chat_response = generation[0]["generated_text"]
            self.messages.append({
                "role": "assistant",
                "content": chat_response,
            })
            chat_response = self.addNewMessage("assistant",chat_response,chat_id)
            return MessageDTO(chat_response)
        else:
            print(f"Failed to generate text: {response.text}")
        return None
    
    def getHFChatResponse(self,encoded_input):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.hf_api_token}"
        }
        payload = {
            "inputs": encoded_input,
            "parameters": {
                "max_new_tokens": int(os.getenv("HF_API_MAX_TOKENS")),
                "return_full_text": False
            }
        }
        response = requests.post(self.api_url, headers=headers, json=payload)
        return response
