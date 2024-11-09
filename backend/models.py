import bcrypt
from database import db

users_collection = db.users

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(hashed_password, password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_user(username, email, password):
    hashed_password = hash_password(password)
    user = {
        "username": username,
        "email": email,
        "password": hashed_password
    }
    users_collection.insert_one(user)

def find_user_by_email(email):
    return users_collection.find_one({"email": email})

def find_user_by_id(user_id):
    return users_collection.find_one({"_id": user_id})
