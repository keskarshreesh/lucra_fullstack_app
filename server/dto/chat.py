from server.entity.chat import Chat

'''
Data Transfer Object for Chat Details
'''
class ChatDTO:
    def __init__(self,chat: Chat) -> None:
        self.id = chat.id
        self.chat_title = chat.chat_title

    def to_dict(self) -> dict:
        return self.__dict__