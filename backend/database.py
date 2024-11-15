from pymongo import MongoClient 
from dotenv import load_dotenv 
import os
import certifi

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"), tlsCaFile=certifi.where())
db = client.AcceleratrDB

# Connect to collections
users_collection = db.users
user_profiles_collection = db.user_profiles

print(users_collection)
print(user_profiles_collection)