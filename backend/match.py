from wordExtractor import extractPhrases
from wordMapping import transformWords
from data_models.user import User
from database import users_collection, user_profiles_collection
from bson import ObjectId
import os
from flask import Flask, Blueprint

def get_user_with_profile(user_id):
    print(user_id)
    user_data = users_collection.find_one({"_id": ObjectId(user_id)})
    profile_data = user_profiles_collection.find_one({"user_id": ObjectId(user_id)})

    if user_data and profile_data:
        return profile_data
    else:
        print("User or profile not found.")
        return None

def jobMatch(user, job):
    user_object = get_user_with_profile(user)

    job_key_words = extractPhrases(job)
    
    
    

