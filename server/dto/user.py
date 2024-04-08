from server.entity.user import User

'''
Data Transfer Object for User Details
'''
class UserDTO:

    def __init__(self,user: User, access_token: str):
        self.username = user.username
        self.email = user.email
        self.firstname = user.firstname
        self.lastname = user.lastname
        self.access_token = access_token
    
    def to_dict(self) -> dict:
        return self.__dict__