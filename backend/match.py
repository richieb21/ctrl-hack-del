from wordExtractor import extractPhrases
from wordMapping import transformWords
from data_models.user import User
from database import users_collection, user_profiles_collection
from bson import ObjectId
from data_models.Entry import School, Project, Experience, Extracurricular, Skills
from data_models.Resume import Resume
from data_models.Section import SkillsSection, EducationSection, ExperiencesSection, ExtracurricularSection, ProjectsSection

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
            'subtitle' : exp.get('position'),
            'date' : exp.get('date'),
            'location' : exp.get('location'),
            'content': exp_text
        })

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
            'link' : proj.get('link', ''),
            'date': proj.get('date', ''),
            'content': proj_text
        })
    
    return sorted(ranking, key=lambda x: x['score'], reverse=True)


# for the params, ranking comes from the above function, and has to be passed in as a userobject or else nono work. you can get it into userform by using the function on line 18
# returns a resume class, which has a topdf and tolatex function.
def resumeGenerate(ranking: list, user:User):
    experience = []
    projects = []

    N = 6
    idx = 0
    while len(experience) + len(projects) < N and idx < len(ranking):
        # Get the original experience/project from user data using the index
        if ranking[idx]['type'] == 'experience':
            # Find the original experience data from user's experiences
            original_exp = user.experiences[ranking[idx]['index']]
            experience.append(Experience(
                title=ranking[idx].get('title', '') or '',
                subTitle=ranking[idx].get('subtitle', '') or '',
                timeFrom=original_exp.get('date', '') or '',
                timeTo=original_exp.get('date', '') or '',
                location=original_exp.get('location', '') or '',
                points=original_exp.get('points', [])  # Get points from original data
            ))
        elif ranking[idx]['type'] == 'project':
            # Find the original project data
            original_proj = user.projects[ranking[idx]['index']]
            projects.append(Project(
                title=ranking[idx].get('title', '') or '',
                subTitle=ranking[idx].get('position', '') or '',
                timeFrom=original_proj.get('date', '') or '',
                timeTo=original_proj.get('date', '') or '',
                link=original_proj.get('link', '') or '',
                points=original_proj.get('description', [])  # Get description from original data
            ))
        idx += 1

    education = []
    for ed in user.education:
        education.append(School(
            title=ed.get('schoolname', '') or '',
            subTitle=ed.get('program', '') or '',
            timeFrom=ed.get('start', '') or '',
            timeTo=ed.get('end', '') or '',
            location=ed.get('location', '') or ''
        ))

    extracurricular = []
    if hasattr(user, 'extra_curricular'):
        for ec in user.extra_curricular:
            extracurricular.append(Extracurricular(
                title=ec.get('title', '') or '',
                subTitle=ec.get('position', '') or '',
                timeFrom=ec.get('date', '') or '',
                timeTo=ec.get('date', '') or '',
                location=ec.get('location', '') or '',
                subPoints=ec.get('points', []) or []
            ))

    skills = Skills(
        languages=user.skills.get('language', []),
        frameworks=user.skills.get('framework', []),
        devTools=user.skills.get('tool', []),
        other=user.skills.get('other', [])
    )

    education_section = EducationSection(education)
    extracurricular_section = ExtracurricularSection(extracurricular)
    project_section = ProjectsSection(projects)
    experience_section = ExperiencesSection(experience)
    skills_section = SkillsSection([skills])

    resume = Resume(
        name=user.username or '',
        email=user.email or '',
        linkedin=user.linkedin_profile or '',
        phone=user.phone_number or '',
        github=user.github_profile or '',
        sections=[education_section, extracurricular_section, project_section, experience_section, skills_section]
    )

    return resume

def jobMatching(rankings):
    if not rankings:
        return []
    
    # Find the maximum score for normalization
    max_score = max(rank['score'] for rank in rankings)
    
    # Normalize scores to be between 0 and 1 if there are non-zero scores
    if max_score > 0:
        for rank in rankings:
            rank['score'] = (rank['score'] / max_score) * 100  # Convert to percentage
    
    # Filter out entries with very low relevance (optional)
    filtered_rankings = [rank for rank in rankings if rank['score'] >= 10]  # 10% threshold
    
    return filtered_rankings

def get_user_object(user_id):
    # Get user and profile data
    user_data = users_collection.find_one({"_id": ObjectId(user_id)})
    profile_data = user_profiles_collection.find_one({"user_id": ObjectId(user_id)})
    
    if not user_data or not profile_data:
        return None
        
    # Create User object using the from_mongo class method
    user = User.from_mongo(user_data, profile_data)
    return user

def get_rankings(user_id, job):
    try:
        # Convert string user_id to ObjectId if it's not already
        if isinstance(user_id, str):
            user_id = ObjectId(user_id)
            
        # Get rankings
        rankings = jobRanking(user_id, job)
        matched_rankings = jobMatching(rankings)
        return matched_rankings
        
    except Exception as e:
        print(f"Error in get_rankings: {str(e)}")
        raise e

# Test the function
if __name__ == "__main__":
    test_user_id = "67308e814e47c133160a54f1"
    test_job = """Build the future of the AI Data Cloud. Join the Snowflake team.

Snowflake started with a clear vision: develop a cloud data platform that is effective, affordable, and accessible to all data users. Snowflake developed an innovative new product with a built-for-the-cloud architecture that combines the power of data warehousing, the flexibility of big data platforms, and the elasticity of the cloud at a fraction of the cost of traditional solutions. We are now a global, world-class organization with offices in more than a dozen countries and serving many more.

We’re looking for dedicated students who share our passion for ground-breaking technology and want to create a lasting future for you and Snowflake.

WHAT WE OFFER:

Paid, full-time internships in the heart of the software industry
Post-internship career opportunities (full-time and/or additional internships)
Exposure to a fast-paced, fun and inclusive culture
A chance to work with world-class experts on challenging projects
Opportunity to provide meaningful contributions to a real system used by customers
High level of access to supervisors (manager and mentor), detailed direction without micromanagement, feedback throughout your internship, and a final evaluation
Stuff that matters: treated as a member of the Snowflake team, included in company meetings/activities, flexible hours, casual dress code, accommodations to work from home, swag and much more
When return to office in effect, catered lunches, access to gaming consoles, recreational games, happy hours, company outings, and more


WHAT WE EXPECT:

Desired class level: 3rd/4th year Undergraduates, Masters, or PhD
Desired majors: Computer Science, Computer Engineering, Software Engineering, or related field
Required coursework: algorithms, data structures, and operating systems
Recommended coursework: cloud computing, database systems, distributed systems, and real-time programming
Bonus experience: working experience, research or publications in databases or distributed systems, and contributions to open source 
When: Summer 2025 (April - September 2025) 
Duration: 12 week minimum, 12-16 weeks recommended
Excellent programming skills in C++ or Java 
Knowledge of data structures and algorithms
Strong problem solving and ability to learn quickly in a dynamic environment
Experience with working as a part of a team
Dedication and passion for technology


WHAT YOU WILL LEARN/GAIN:

How to build enterprise grade, reliable, and trustworthy software/services
Exposure to SQL or other database technologies
Understanding of database internals, large-scale data processing, transaction processing, distributed systems, and data warehouse design
Implementation, testing of features in query compilation, compiler design, query execution
Experience working with cloud infrastructure, AWS, Azure, and/or Google Cloud in particular
Learning about cutting edge database technology and research


POSSIBLE TEAMS/WORK FOCUS AREAS:

Data Applications Infrastructure, Data Marketplace, Data Privacy, Data Sharing 
High performance large-scale data processing
Large-scale distributed systems
Software-as-a-Service platform
Software frameworks for stability and performance testing


Every Snowflake employee is expected to follow the company’s confidentiality and security standards for handling sensitive data. Snowflake employees must abide by the company’s data security plan as an essential part of their duties. It is every employee's duty to keep customer information secure and confidential.

Snowflake is growing fast, and we’re scaling our team to help enable and accelerate our growth. We are looking for people who share our values, challenge ordinary thinking, and push the pace of innovation while building a future for themselves and Snowflake.."""  # Your job description
    rankings = jobRanking(test_user_id, test_job)
    matched_rankings = jobMatching(rankings)
    
    print("\nTop Matches:")
    for rank in matched_rankings[:5]:  # Show top 5 matches
        print(f"\nType: {rank['type']}")
        print(f"Title: {rank['title']}")
        print(f"Score: {rank['score']:.2f}")

    user_data = get_user_object(test_user_id)

    # 3. Generate the resume
    resume = resumeGenerate(matched_rankings, user_data)
    print(resume.toLatex())

    # 2. Get user object
    user = get_user_object(test_user_id)
    if user:
        # 3. Generate resume
        resume = resumeGenerate(matched_rankings, user)
        
        # 4. Generate output
        latex_content = resume.toLatex()
        print(latex_content)
        # Or PDF
        # resume.toPDF("output.pdf")

