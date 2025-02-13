from flask import Flask
from flask_cors import CORS
from .route import main, api

def create_app():
    app = Flask(__name__, static_folder='static', template_folder='template')
    app.register_blueprint(main)
    app.register_blueprint(api, url_prefix='/api')
    CORS(app)
    return app