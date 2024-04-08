from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from server.dto.chat import ChatDTO
from server.dto.status_message import StatusMessage
from server.service.chat import ChatService

from server.constants.auth import JWT_AUTH_FAILED
from server.constants.chat import CHAT_CREATION_FAILED,FIND_LATEST_CHAT_FAILED

chat_bp = Blueprint('chat',__name__)

chat_service = ChatService()

"""
Creates a new chat session for the authenticated user.

The endpoint requires a valid JWT in the request headers for user authentication.
It expects a JSON payload with the username for which to create the chat session.

- `username`: The username of the user initiating the chat.

The chat session is created only if the authenticated user matches the provided username.

Returns:
- Chat session details and a 200 status code if the chat is successfully created.
- An error message and a 401 status code if the JWT authentication fails (i.e., the current user does not match the provided username).
- An error message and a 400 status code if the chat session could not be created.

Example request payload:
{
  "username": "johndoe"
}
"""
@chat_bp.route('/create', methods=['POST'])
@jwt_required(locations=["headers"])
def createChat():
    username = request.json.get('username', None)
    current_user = get_jwt_identity()

    if current_user != username:
        jsonify(StatusMessage(JWT_AUTH_FAILED).to_dict), 401

    chat = chat_service.createChat(username)
    if chat is None:
        return jsonify(StatusMessage(CHAT_CREATION_FAILED)), 400
    
    return jsonify(ChatDTO(chat).to_dict()), 200

"""
Fetches the most recent chat session for the authenticated user.

The endpoint requires a valid JWT in the request headers for user authentication.
It expects a JSON payload with the username to retrieve the latest chat session for.

- `username`: The username of the user whose latest chat session is to be retrieved.

The latest chat session is retrieved only if the authenticated user matches the provided username.

Returns:
- Details of the latest chat session and a 200 status code if the chat exists.
- An error message and a 401 status code if the JWT authentication fails (i.e., the current user does not match the provided username).
- An error message and a 400 status code if there is no chat session available for the user.

Example request payload:
{
  "username": "johndoe"
}
"""
@chat_bp.route('/latest', methods=['POST'])
@jwt_required(locations=["headers"])
def getLatestChat():
    username = request.json.get('username', None)
    current_user = get_jwt_identity()

    if current_user != username:
        jsonify(StatusMessage(JWT_AUTH_FAILED).to_dict()), 401

    chat = chat_service.getLatestChatByUsername(username)
    if chat is None:
        return jsonify(StatusMessage(FIND_LATEST_CHAT_FAILED).to_dict()), 400
    
    return jsonify(ChatDTO(chat).to_dict()), 200