from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, verify_jwt_in_request, get_jwt_identity, jwt_required

from server.service.user import UserService

from server.dto.user import UserDTO
from server.dto.status_message import StatusMessage

from server.constants.auth import SIGNUP_FAILED_DUPLICATE_USERNAME, SIGNUP_FAILED_DUPLICATE_EMAIL, SIGNUP_SUCCESS
from server.constants.auth import LOGIN_FAILED, JWT_INVALID

auth_bp = Blueprint('auth',__name__)

user_service = UserService()

@auth_bp.route('/signup', methods=['POST'])
def signup():
    firstname = request.json.get('firstname', None)
    lastname = request.json.get('lastname', None)
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if user_service.getUserByUsername(username) is not None:
        return jsonify(StatusMessage(SIGNUP_FAILED_DUPLICATE_USERNAME).to_dict()), 400
    if user_service.getUserByUsername(email) is not None:
        return jsonify(StatusMessage(SIGNUP_FAILED_DUPLICATE_EMAIL).to_dict()), 400
    
    user_service.createNewUser(username,firstname,lastname,email,password)

    return jsonify(StatusMessage(SIGNUP_SUCCESS).to_dict()), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    user = user_service.getUserByUsername(username)
    if user and user_service.isPasswordValid(user, password):
        access_token = create_access_token(identity=username)
        resp = make_response(jsonify(UserDTO(user,access_token).to_dict()),200)
        return resp
    
    return jsonify(StatusMessage(LOGIN_FAILED).to_dict()), 401

@auth_bp.route("/user", methods=["GET"])
@jwt_required(locations=["headers"])
def fetch_user_details():
    username = get_jwt_identity()
    if username is None:
        return jsonify(StatusMessage(JWT_INVALID).to_dict()), 401
    
    user = user_service.getUserByUsername(username)
    return jsonify(UserDTO(user,"").to_dict()), 200
