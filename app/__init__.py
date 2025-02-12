from flask import Flask
from flask_cors import CORS as cors
from .route import main

def create_app():
    app = Flask(__name__, static_folder='static', template_folder='template')
    app.register_blueprint(main)
    cors(app)
    return app