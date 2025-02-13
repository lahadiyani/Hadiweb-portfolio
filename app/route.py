import json
from flask import Blueprint, render_template, url_for, jsonify, request
from .github.github import GitHubAPI

main = Blueprint('main', __name__)
api = Blueprint('api', __name__)

@main.route('/')
def index():
    return render_template('base.html')

@api.route('/repos', methods=['GET'])
def get_repos():
    github = GitHubAPI()
    repos = github.fetch_repos()
    page = request.args.get('page', default=5, type=int)
    return jsonify(repos)