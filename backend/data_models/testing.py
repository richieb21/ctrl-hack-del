from .Entry import School, Project, Experience, Extracurricular, Skills
from .Resume import Resume
from .Section import SkillsSection, EducationSection, ExperiencesSection, ExtracurricularSection, ProjectsSection
from .user import User

def resumeGenerate(ranking: list, user:User):
    experience = []
    projects = []

    N = 6
    idx = 0
    while len(experience) + len(projects) < N and idx < len(ranking):
        item = ranking[idx]
        if len(experience) == N - 1 and item['type'] == 'project':
            projects.append(Project(
                title=item['title'],
                subTitle="",
                timeFrom=item['date'],
                timeTo=item['date'],
                link=item['link'],
            ))
        elif len(projects) == N - 1 and item['type'] == 'experience':
            experience.append(Experience(
                title=item['title'],
                subTitle=item['subtitle'],
                timeFrom=item['date'],
                timeTo=item['date'],
                location=item['location'],
            ))
        else:
            if item['type'] == 'experience':
                experience.append(Experience(
                    title=item['title'],
                    subTitle=item['subtitle'],
                    timeFrom=item['date'],
                    timeTo=item['date'],
                    location=item['location'],
                    points=item['description']
                ))
            elif item['type'] == 'project':
                projects.append(Project(
                    title=item['title'],
                    subTitle=item['position'],
                    timeFrom=item['date'],
                    timeTo=item['date'],
                    link=item['link'],
                    points=item['description']
                ))

        idx += 1


    education = []
    for ed in user.get('education', []):
        education.append(School(
            title = ed['schoolname'], subTitle = ed['program'], 
            timeFrom = ed['start'],
            timeTo = ed['end'],
            location=""
        ))
    extracurricular = []
    for ec in user.get('extra_curricular', []):
        extracurricular.append(Extracurricular(
            title=ec['title'],
            subTitle=ec['position'],
            timeFrom='',
            timeTo='',
            location='',
            subPoints=ec.get('points', [])
        ))
    skills = Skills(
        languages=user.get('skills', {})['language'],
        frameworks=user.get('skills', {})['frameworks'],
        devTools=user.get('skills', {})['language'],
        other=user.get('skills', {})['other']
    )

    education_section = EducationSection(education)
    extracurricular_section = ExtracurricularSection(extracurricular)
    project_section = ProjectsSection(projects)
    experience_section = ExperiencesSection(experience)
    skills_section = SkillsSection([skills])

    print(experience)
    print(projects)
    resume = Resume(
        name = user.get('name', ""),
        email= user.get('email', ""),
        linkedin = user.get('linkedin', ""),
        phone = user.get('phone', ""),
        github = user.get('github', ""),
        sections=[education_section, extracurricular_section, project_section, experience_section, skills_section]
    )

    return resume


# # Example objects for each class

# # School entries
# school1 = School(
#     title="Bachelor of Science in Computer Science",
#     subTitle="University of Example",
#     timeFrom="Sept 2018",
#     timeTo="June 2022",
#     location="Example City, EX"
# )

# school2 = School(
#     title="Master of Science in Data Science",
#     subTitle="Example Institute of Technology",
#     timeFrom="Sept 2023",
#     timeTo="Present",
#     location="Example City, EX"
# )

# # Extracurricular entries
# extracurricular1 = Extracurricular(
#     title="Volunteer Teacher",
#     subTitle="Code for Good",
#     timeFrom="Jan 2020",
#     timeTo="Dec 2020",
#     location="Example Community Center",
#     subPoints=[
#         "Taught basic programming to underprivileged youth.",
#         "Organized weekly coding workshops."
#     ]
# )

# extracurricular2 = Extracurricular(
#     title="Club President",
#     subTitle="University Coding Club",
#     timeFrom="Sept 2019",
#     timeTo="June 2021",
#     location="University of Example",
#     subPoints=[
#         "Led a team of 20 members to organize hackathons and coding bootcamps.",
#         "Increased club membership by 50%."
#     ]
# )

# # Project entries
# project1 = Project(
#     title="Personal Portfolio Website",
#     subTitle="Self-Initiated",
#     timeFrom="Feb 2021",
#     timeTo="April 2021",
#     link="https://portfolio.example.com",
#     points=[
#         "Built a responsive personal portfolio website using HTML, CSS, and JavaScript.",
#         "Showcases projects, skills, and contact information."
#     ]
# )

# project2 = Project(
#     title="Data Analysis Pipeline",
#     subTitle="Data Science Internship",
#     timeFrom="June 2022",
#     timeTo="Aug 2022",
#     link="https://github.com/example/data-analysis-pipeline",
#     points=[
#         "Developed a data analysis pipeline to clean, process, and visualize large datasets.",
#         "Reduced data processing time by 30%."
#     ]
# )

# # Experience entries
# experience1 = Experience(
#     title="Software Engineer Intern",
#     subTitle="Tech Solutions Inc.",
#     timeFrom="May 2021",
#     timeTo="Aug 2021",
#     location="Example City, EX",
#     points=[
#         "Developed a REST API to manage user data, reducing response time by 25%.",
#         "Collaborated with the frontend team to integrate backend services."
#     ]
# )

# experience2 = Experience(
#     title="Junior Developer",
#     subTitle="InnovateX",
#     timeFrom="Sept 2022",
#     timeTo="May 2023",
#     location="Example City, EX",
#     points=[
#         "Maintained and optimized e-commerce platform, improving page load speed by 40%.",
#         "Automated recurring tasks, saving the team 10 hours per week."
#     ]
# )

# # Skills entry
# skills = Skills(
#     languages=["Python", "Java", "C++"],
#     frameworks=["Django", "React"],
#     devTools=["Git", "Docker", "VS Code"],
#     other=["SQL", "Machine Learning"]
# )

# # Print LaTeX outputs for demonstration (not necessary in real usage, just for illustration)
# # print(school1.toLatex())
# # print(extracurricular1.toLatex())
# # print(project1.toLatex())
# # print(experience1.toLatex())
# # print(skills.toLatex())

# education_section = EducationSection([school1, school2])
# extracurricular_section = ExtracurricularSection([extracurricular1, extracurricular2])
# project_section = ProjectsSection([project1, project2])
# experience_section = ExperiencesSection([experience1, experience2])
# skills_section = SkillsSection([skills])

# resume = Resume(
#     name="John Doe",
#     email="johndoe@example.com",
#     linkedin="https://linkedin.com/in/johndoe",
#     phone="123-456-7890",
#     github="https://github.com/johndoe",
#     sections=[education_section, extracurricular_section, project_section, experience_section, skills_section]
# )

# print(resume.toLatex())
# # resume.resumeToPdf()
# # print(resume.toDict())



# Define fake user profile data
user_mock_data = {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "linkedin": "https://linkedin.com/in/johndoe",
    "phone": "123-456-7890",
    "github": "https://github.com/johndoe",
    "education": [
        {
            "schoolname": "University of Example",
            "program": "Bachelor of Computer Science",
            "start": "2018-09-01",
            "end": "2022-06-01"
        }
    ],
    "experiences": [
        {
            "title": "Software Engineer Intern",
            "position": "Intern",
            "date": "Summer 2021",
            "location": "Example Corp",
            "points": [
                "Developed backend APIs",
                "Implemented data processing pipelines"
            ]
        }
    ],
    "projects": [
        {
            "name": "Data Analysis Tool",
            "description": ["Built a tool for large-scale data analysis", "Implemented algorithms in Python"],
            "link": "https://github.com/johndoe/data-analysis-tool",
            "date": "2021-08-01"
        }
    ],
    "extra_curricular": [
        {
            "title": "Programming Club",
            "position": "President",
            "points": ["Organized coding events", "Led workshops on data structures"]
        }
    ],
    "skills": {
        "language": ["Python", "Java"],
        "frameworks": ["Django", "React"],
        "devTools": ["Git", "Docker"],
        "other": ["Machine Learning"]
    }
}

# Mock job description (to be used with jobRanking)
test_job_description = """
Looking for a software engineer with experience in Python, data processing, and backend API development.
"""


# Mock Ranking Output (normally generated by jobRanking function)
ranking_mock = [
    {
        'type': 'experience',
        'index': 0,
        'score': 90,
        'title': "Software Engineer Intern",
        'subtitle': "Intern",
        'date': "Summer 2021",
        'location': "Example Corp",
        'description': ["Developed backend APIs and implemented data processing pipelines."]
    },
    {
        'type': 'project',
        'index': 0,
        'score': 85,
        'title': "Data Analysis Tool",
        'position': "DOINT HTE THING YE",
        'link': "https://github.com/johndoe/data-analysis-tool",
        'date': "2021-08-01",
        'description': ["Built a tool for large-scale data analysis, implemented algorithms in Python."]
    }
]

# Create a fake User object
class MockUser:
    def get(self, attribute, default):
        return user_mock_data.get(attribute, default)

# Instantiate Mock User
user = MockUser()

# Run the resumeGenerate function with the mock data
resume = resumeGenerate(ranking_mock, user)

# Print LaTeX output (or generate PDF if needed)
print(resume.toLatex())

# `# Optionally, to test the PDF generation function, you can call:
# resume.resumeToPdf()`
