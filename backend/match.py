from wordExtractor import extractPhrases
from wordMapping import transformWords
from data_models.user import User
from database import users_collection, user_profiles_collection
from bson import ObjectId

def get_user_with_profile(user_id):
    user_data = users_collection.find_one({"user_id": ObjectId(user_id)})
    profile_data = user_profiles_collection.find_one({"user_id": ObjectId(user_id)})

    if user_data and profile_data:
        return User.from_mongo(user_data, profile_data)
    else:
        print("User or profile not found.")
        return None

def jobRanking(user, job):
    user_object = get_user_with_profile(user)
    print(user_object)
    print(user_object.skills)

    job_keywords = extractPhrases(job)
    job_keywords_strings = []
    job_key_maps = {}
    for keyword in job_keywords:
        job_key_maps[keyword[0]] = job_key_maps[keyword[1]]
        job_keywords_strings.append(keyword[0])
    
    ranking = []
    for exp in user_object.experiences:
        exp_keywords = extractPhrases(exp)
        exp_keywords_strings = []
        for keyword in exp_keywords:
            exp_keywords_strings.append(keyword[0])
        experience_keywords = transformWords(exp_keywords_strings, job_keywords_strings)

        score = 0
        for keyword in experience_keywords:
            score += keyword[2] * job_key_maps[keyword[1]]
            ranking.append(score)
    return ranking