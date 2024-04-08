from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017')
db = client['chatdb']

users = db['users']

users.create_index('username', unique=True)
users.create_index('password')
users.create_index('firstName')
users.create_index('lastName')
users.create_index([('firstName',1),('lastName',1)],unique=True)
users.create_index('upvoted_message_ids')
users.create_index('downvoted_message_ids')

messages = db['messages']
messages.create_index('message')
messages.create_index('user_id')
messages.create_index('userFirstName')
messages.create_index('userLastName')
messages.create_index('timestamp')
messages.create_index([('message',1),('user_id',1),('timestamp',1)],unique=True)
messages.create_index('num_upvotes')

print('Database and collections with constraints created')
