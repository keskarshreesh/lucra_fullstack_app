from datetime import datetime, timezone

from server.database import db

'''
SQL Alchemy Model corresponding to the "messages" table in the MySQL database, to store the message history
chat_id linked (foreign key) to id in the "chats" table
'''
class Message(db.Model):
    __tablename__ = 'messages'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    chat_role = db.Column(db.String(255), nullable=False)
    chat_id = db.Column(db.Integer, db.ForeignKey('chats.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f'<Message id={self.id} chat_id={self.chat_id}>'