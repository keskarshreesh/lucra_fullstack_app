'''
Data Transfer Object for Application Status Message
'''
class StatusMessage:
    def __init__(self,message) -> None:
        self.message = message
    
    def to_dict(self) -> dict:
        return self.__dict__