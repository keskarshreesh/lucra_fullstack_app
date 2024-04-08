from server.database import db

'''
SQL Alchemy Model corresponding to the "messages" table in the MySQL database, to store the user accounts
'''
class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255), unique=True, nullable=False)
    lastname = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'