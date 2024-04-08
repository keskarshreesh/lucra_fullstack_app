import uuid
from datetime import datetime, timezone

from server.database import db

'''
SQL Alchemy Model corresponding to the "chats" table in the MySQL database, to store the chat history
user_id linked (foreign key) to id in the "users" table
'''
class Chat(db.Model):
    __tablename__ = 'chats'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    chat_title = db.Column(db.String(255), unique=True, nullable=False, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f'<Chat {self.chat_title}>'