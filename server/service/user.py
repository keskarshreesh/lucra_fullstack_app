from werkzeug.security import generate_password_hash, check_password_hash

from server.entity.user import User
from server.database import db

class UserService:
    def createNewUser(self, username: str, firstname: str, lastname: str, email: str, password: str) -> None:
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, firstname=firstname, lastname=lastname, password=hashed_password, email=email)
        db.session.add(new_user)
        db.session.commit()
        return new_user
    
    def getUserByUsername(self, username: str) -> User:
        return User.query.filter_by(username=username).first()
    
    def getUserByEmail(self, email: str) -> User:
        return User.query.filter_by(email=email).first()
    
    def isPasswordValid(self, user: User, password: str) -> bool:
        
        return check_password_hash(user.password,password)

    
