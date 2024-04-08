from sqlalchemy import desc

from server.database import db
from server.entity.chat import Chat
from server.entity.user import User
from server.service.user import UserService

class ChatService:
    def __init__(self) -> None:
        self.user_service = UserService()
    
    def createChat(self,username:str) -> Chat:
        user = self.user_service.getUserByUsername(username)
        if user is None: return None
        new_chat = Chat(user_id=user.id)
        db.session.add(new_chat)
        db.session.commit()
        return new_chat
    
    def getLatestChatByUsername(self,username: str) -> Chat:
        user = self.user_service.getUserByUsername(username)
        return db.session.query(Chat).filter_by(user_id=user.id).order_by(desc(Chat.created_at)).first()
