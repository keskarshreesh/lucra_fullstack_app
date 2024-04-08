from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from server.dto.status_message import StatusMessage
from server.service.message import MessageService

from server.constants.auth import JWT_AUTH_FAILED
from server.constants.message import MESSAGE_RESPONSE_FAILED

message_bp = Blueprint('message',__name__)

message_service = MessageService()

@message_bp.route('/all', methods=['POST'])
@jwt_required(locations=["headers"])
def getAllMessages():
    username = request.json.get('username', None)
    current_user = get_jwt_identity()

    if current_user != username:
        return jsonify(StatusMessage(JWT_AUTH_FAILED).to_dict), 401
    
    chat_id = request.json.get('chat_id',None)

    return jsonify(message_service.getMessagesByChatId(chat_id)), 200

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