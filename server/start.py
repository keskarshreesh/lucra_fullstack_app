import os
import sys
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from datetime import timedelta
from urllib.parse import quote

current_script_path = os.path.abspath(os.path.dirname(__file__))
parent_directory = os.path.dirname(current_script_path)
if parent_directory not in sys.path:
    sys.path.insert(0, parent_directory)

from server.database import db

from controller.auth import auth_bp
from controller.chat import chat_bp
from controller.message import message_bp

from entity.user import User
from entity.chat import Chat
from entity.message import Message

load_dotenv()
FRONTEND_BASE_URL = os.getenv("FRONTEND_BASE_URL")
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

def create_app():
    app = Flask(__name__)
    # Callback for CORS configuration
    CORS(app, supports_credentials=True, origins=[FRONTEND_BASE_URL])

    # Configure the SQLALCHEMY_DATABASE_URI with credentials and connection information
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{DB_USERNAME}:{quote(DB_PASSWORD)}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    # Set the JWT secret key and expiry, initialize jwt manager
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=60)
    jwt = JWTManager(app)

    # Callback for expired JWT in request header
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return jsonify({
            'status': 401,
            'sub_status': 42,
            'message': 'The token has expired'
        }), 401
    
    # Callback for invalid JWT in request header
    @jwt.invalid_token_loader
    def invalid_token_callback(error_string):
        return jsonify({
            'status': 401,
            'message': 'The token is invalid',
            'error': error_string
        }), 401
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(chat_bp, url_prefix='/chat')
    app.register_blueprint(message_bp, url_prefix='/message')

    with app.app_context():
        db.create_all()

    return app

# Change for higher environments
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)