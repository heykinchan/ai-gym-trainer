from flask import Flask, request, jsonify
from models.loginModel import db, User
from control.loginController import login_user

app = Flask(__name__)
app.config.from_pyfile('config.py')

# 初始化数据库
db.init_app(app)

# 登录API
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    return login_user(username, password)

if __name__ == '__main__':
    app.run(debug=True)