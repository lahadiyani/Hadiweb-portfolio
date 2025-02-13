import requests as res

class GitHubAPI:
    def __init__(self, username=None):
        self.username = username if username else "lahadiyani"
        self.url = f"https://forestapi.vercel.app/api/github/user/{self.username}/repos"
        self.header = {"User-Agent": "Mozilla/5.0"}

    def fetch_repos(self):
        try:
            r = res.get(self.url, self.header, timeout=10)
            if r.status_code == 200:
                return r.json()
            return {"error": f"Error {r.status_code}: {r.text}"}
        except res.exceptions.RequestException as e:
            return {"error": str(e)}
