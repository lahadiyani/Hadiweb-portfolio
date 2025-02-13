import json
from flask import Blueprint, render_template, url_for, jsonify
from .github.github import GitHubAPI

main = Blueprint('main', __name__)
api = Blueprint('api', __name__)

@main.route('/')
def index():
    github = GitHubAPI()
    repos = github.fetch_repos()
    return render_template('base.html', repos=repos)