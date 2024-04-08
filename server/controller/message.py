from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from server.dto.status_message import StatusMessage
from server.service.message import MessageService

from server.constants.auth import JWT_AUTH_FAILED
from server.constants.message import MESSAGE_RESPONSE_FAILED

message_bp = Blueprint('message',__name__)

message_service = MessageService()

"""
Retrieves all messages associated with a specific chat session for the authenticated user.

This endpoint requires a valid JWT in the request headers for authentication. It expects a JSON payload containing the username of the user requesting the messages and the unique identifier of the chat session (`chat_id`).

- `username`: The username of the user requesting the messages. This must match the current authenticated user derived from the JWT.
- `chat_id`: The unique identifier of the chat session from which to retrieve messages.

The messages are retrieved only if the authenticated user matches the provided username.

Returns:
- A list of messages and a 200 status code if messages are successfully retrieved.
- An error message and a 401 status code if JWT authentication fails (i.e., the current user does not match the provided username).

Example request payload:
{
  "username": "johndoe",
  "chat_id": "12345"
}
"""
@message_bp.route('/all', methods=['POST'])
@jwt_required(locations=["headers"])
def getAllMessages():
    username = request.json.get('username', None)
    current_user = get_jwt_identity()

    if current_user != username:
        return jsonify(StatusMessage(JWT_AUTH_FAILED).to_dict), 401
    
    chat_id = request.json.get('chat_id',None)

    return jsonify(message_service.getMessagesByChatId(chat_id)), 200

"""
Allows the authenticated user to interact with an AI assistant within a specified chat session.

This endpoint requires a valid JWT in the request headers for user authentication. It expects a JSON payload with the username of the user initiating the interaction, the user's message to the AI, and the unique identifier of the chat session (`chat_id`).

- `username`: The username of the user interacting with the AI assistant. This must match the current authenticated user derived from the JWT.
- `user_message`: The message that the user wants to send to the AI assistant.
- `chat_id`: The unique identifier of the chat session for this interaction.

The interaction is allowed only if the authenticated user matches the provided username.

Returns:
- The AI assistant's response message and a 200 status code if the interaction is successful.
- An error message and a 401 status code if JWT authentication fails (i.e., the current user does not match the provided username).
- An error message and a 400 status code if the AI assistant fails to generate a response.

Example request payload:
{
  "username": "johndoe",
  "user_message": "Hello, what's the weather like today?",
  "chat_id": "12345"
}
"""
@message_bp.route('/chat-with-ai', methods=['POST'])
@jwt_required(locations=["headers"])
def chatWithAssistant():
    username = request.json.get('username', None)
    current_user = get_jwt_identity()

    if current_user != username:
        return jsonify(StatusMessage(JWT_AUTH_FAILED).to_dict), 401
    
    user_message = request.json.get('user_message',None)
    chat_id = request.json.get('chat_id',None)

    message_response = message_service.getMessageResponse(user_message,chat_id)
    if message_response is None:
        return jsonify(StatusMessage(MESSAGE_RESPONSE_FAILED).to_dict), 400
    return jsonify(message_response.to_dict()), 200