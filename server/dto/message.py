from server.entity.message import Message

'''
Data Transfer Object for Chat Message
'''
class MessageDTO:
    def __init__(self,message: Message):
        self.message = message.message
        self.role = message.chat_role
        self.timestamp = message.created_at
    
    def to_dict(self) -> dict:
        return self.__dict__