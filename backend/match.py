from wordExtractor import extractPhrases
from wordMapping import transformWords
from data_models.user import User
from database import users_collection, user_profiles_collection
from bson import ObjectId

def get_user_with_profile(user_id):
    print(user_id)
    user_data = users_collection.find_one({"_id": ObjectId(user_id)})
    profile_data = user_profiles_collection.find_one({"user_id": ObjectId(user_id)})

    if user_data and profile_data:
        return profile_data
    else:
        print("User or profile not found.")
        return None

def jobRanking(user, job):
    user_object = get_user_with_profile(user)
    if not user_object:
        return []

    # Extract job keywords
    job_keywords = extractPhrases(job)
    job_keywords_strings = []
    job_key_maps = {}
    
    # Initialize the mapping with default weights
    for keyword in job_keywords:
        job_keywords_strings.append(keyword)
        job_key_maps[keyword] = 1.0  # Default weight
    
    ranking = []
    
    # Process experiences
    experiences = user_object.get('experiences', [])
    for i, exp in enumerate(experiences):
        exp_text = f"{exp.get('title', '')} {exp.get('position', '')} {' '.join(exp.get('points', []))}"
        exp_keywords = extractPhrases(exp_text)
        experience_keywords = transformWords(exp_keywords, job_keywords_strings)

        score = 0
        for keyword, match, similarity in experience_keywords:
            if match in job_key_maps:
                score += similarity * job_key_maps[match]
        
        ranking.append({
            'type': 'experience',
            'index': i,
            'score': score,
            'title': exp.get('title', ''),
            'content': exp_text
        })
    
    # Process projects
    projects = user_object.get('projects', [])
    for i, proj in enumerate(projects):
        proj_text = f"{proj.get('name', '')} {' '.join(proj.get('description', []))}"
        proj_keywords = extractPhrases(proj_text)
        project_keywords = transformWords(proj_keywords, job_keywords_strings)

        score = 0
        for keyword, match, similarity in project_keywords:
            if match in job_key_maps:
                score += similarity * job_key_maps[match]
        
        ranking.append({
            'type': 'project',
            'index': i,
            'score': score,
            'title': proj.get('name', ''),
            'content': proj_text
        })
    
    return ranking

def jobMatching(ranking: list):
    # Sort by score in descending order
    sorted_ranking = sorted(ranking, key=lambda x: x['score'], reverse=True)
    return sorted_ranking

# # Test the function
# if __name__ == "__main__":
#     test_user_id = "6730465a20ef67f486a49f98"
#     test_job = """Build the future of the AI Data Cloud. Join the Snowflake team.

# Snowflake started with a clear vision: develop a cloud data platform that is effective, affordable, and accessible to all data users. Snowflake developed an innovative new product with a built-for-the-cloud architecture that combines the power of data warehousing, the flexibility of big data platforms, and the elasticity of the cloud at a fraction of the cost of traditional solutions. We are now a global, world-class organization with offices in more than a dozen countries and serving many more.

# We’re looking for dedicated students who share our passion for ground-breaking technology and want to create a lasting future for you and Snowflake.

# WHAT WE OFFER:

# Paid, full-time internships in the heart of the software industry
# Post-internship career opportunities (full-time and/or additional internships)
# Exposure to a fast-paced, fun and inclusive culture
# A chance to work with world-class experts on challenging projects
# Opportunity to provide meaningful contributions to a real system used by customers
# High level of access to supervisors (manager and mentor), detailed direction without micromanagement, feedback throughout your internship, and a final evaluation
# Stuff that matters: treated as a member of the Snowflake team, included in company meetings/activities, flexible hours, casual dress code, accommodations to work from home, swag and much more
# When return to office in effect, catered lunches, access to gaming consoles, recreational games, happy hours, company outings, and more


# WHAT WE EXPECT:

# Desired class level: 3rd/4th year Undergraduates, Masters, or PhD
# Desired majors: Computer Science, Computer Engineering, Software Engineering, or related field
# Required coursework: algorithms, data structures, and operating systems
# Recommended coursework: cloud computing, database systems, distributed systems, and real-time programming
# Bonus experience: working experience, research or publications in databases or distributed systems, and contributions to open source 
# When: Summer 2025 (April - September 2025) 
# Duration: 12 week minimum, 12-16 weeks recommended
# Excellent programming skills in C++ or Java 
# Knowledge of data structures and algorithms
# Strong problem solving and ability to learn quickly in a dynamic environment
# Experience with working as a part of a team
# Dedication and passion for technology


# WHAT YOU WILL LEARN/GAIN:

# How to build enterprise grade, reliable, and trustworthy software/services
# Exposure to SQL or other database technologies
# Understanding of database internals, large-scale data processing, transaction processing, distributed systems, and data warehouse design
# Implementation, testing of features in query compilation, compiler design, query execution
# Experience working with cloud infrastructure, AWS, Azure, and/or Google Cloud in particular
# Learning about cutting edge database technology and research


# POSSIBLE TEAMS/WORK FOCUS AREAS:

# Data Applications Infrastructure, Data Marketplace, Data Privacy, Data Sharing 
# High performance large-scale data processing
# Large-scale distributed systems
# Software-as-a-Service platform
# Software frameworks for stability and performance testing


# Every Snowflake employee is expected to follow the company’s confidentiality and security standards for handling sensitive data. Snowflake employees must abide by the company’s data security plan as an essential part of their duties. It is every employee's duty to keep customer information secure and confidential.

# Snowflake is growing fast, and we’re scaling our team to help enable and accelerate our growth. We are looking for people who share our values, challenge ordinary thinking, and push the pace of innovation while building a future for themselves and Snowflake.."""  # Your job description
#     rankings = jobRanking(test_user_id, test_job)
#     matched_rankings = jobMatching(rankings)
    
#     print("\nTop Matches:")
#     for rank in matched_rankings[:5]:  # Show top 5 matches
#         print(f"\nType: {rank['type']}")
#         print(f"Title: {rank['title']}")
#         print(f"Score: {rank['score']:.2f}")

