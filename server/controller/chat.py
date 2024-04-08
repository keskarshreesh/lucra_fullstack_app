from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from server.dto.chat import ChatDTO
from server.dto.status_message import StatusMessage
from server.service.chat import ChatService

from server.constants.auth import JWT_AUTH_FAILED
from server.constants.chat import CHAT_CREATION_FAILED,FIND_LATEST_CHAT_FAILED

chat_bp = Blueprint('chat',__name__)

chat_service = ChatService()

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