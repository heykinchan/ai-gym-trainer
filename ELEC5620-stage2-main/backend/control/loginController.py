from models.loginModel import User, db

print("loginController module loaded")

def login_user(username, password):

    print("login_user function called")

    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        return {"message": "Login successful"}, 200
    else:
        return {"message": "Invalid credentials"}, 401