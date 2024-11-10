from Entry import School, Project, Experience, Extracurricular, Skills
from Resume import Resume
from Section import *

# Example objects for each class

# School entries
school1 = School(
    title="Bachelor of Science in Computer Science",
    subTitle="University of Example",
    timeFrom="Sept 2018",
    timeTo="June 2022",
    location="Example City, EX"
)

school2 = School(
    title="Master of Science in Data Science",
    subTitle="Example Institute of Technology",
    timeFrom="Sept 2023",
    timeTo="Present",
    location="Example City, EX"
)

# Extracurricular entries
extracurricular1 = Extracurricular(
    title="Volunteer Teacher",
    subTitle="Code for Good",
    timeFrom="Jan 2020",
    timeTo="Dec 2020",
    location="Example Community Center",
    subPoints=[
        "Taught basic programming to underprivileged youth.",
        "Organized weekly coding workshops."
    ]
)

extracurricular2 = Extracurricular(
    title="Club President",
    subTitle="University Coding Club",
    timeFrom="Sept 2019",
    timeTo="June 2021",
    location="University of Example",
    subPoints=[
        "Led a team of 20 members to organize hackathons and coding bootcamps.",
        "Increased club membership by 50%."
    ]
)

# Project entries
project1 = Project(
    title="Personal Portfolio Website",
    subTitle="Self-Initiated",
    timeFrom="Feb 2021",
    timeTo="April 2021",
    link="https://portfolio.example.com",
    points=[
        "Built a responsive personal portfolio website using HTML, CSS, and JavaScript.",
        "Showcases projects, skills, and contact information."
    ]
)

project2 = Project(
    title="Data Analysis Pipeline",
    subTitle="Data Science Internship",
    timeFrom="June 2022",
    timeTo="Aug 2022",
    link="https://github.com/example/data-analysis-pipeline",
    points=[
        "Developed a data analysis pipeline to clean, process, and visualize large datasets.",
        "Reduced data processing time by 30%."
    ]
)

# Experience entries
experience1 = Experience(
    title="Software Engineer Intern",
    subTitle="Tech Solutions Inc.",
    timeFrom="May 2021",
    timeTo="Aug 2021",
    location="Example City, EX",
    points=[
        "Developed a REST API to manage user data, reducing response time by 25%.",
        "Collaborated with the frontend team to integrate backend services."
    ]
)

experience2 = Experience(
    title="Junior Developer",
    subTitle="InnovateX",
    timeFrom="Sept 2022",
    timeTo="May 2023",
    location="Example City, EX",
    points=[
        "Maintained and optimized e-commerce platform, improving page load speed by 40%.",
        "Automated recurring tasks, saving the team 10 hours per week."
    ]
)

# Skills entry
skills = Skills(
    languages=["Python", "Java", "C++"],
    frameworks=["Django", "React"],
    devTools=["Git", "Docker", "VS Code"],
    other=["SQL", "Machine Learning"]
)

# Print LaTeX outputs for demonstration (not necessary in real usage, just for illustration)
# print(school1.toLatex())
# print(extracurricular1.toLatex())
# print(project1.toLatex())
# print(experience1.toLatex())
# print(skills.toLatex())

education_section = EducationSection([school1, school2])
extracurricular_section = ExtracurricularSection([extracurricular1, extracurricular2])
project_section = ProjectsSection([project1, project2])
experience_section = ExperiencesSection([experience1, experience2])
skills_section = SkillsSection([skills])

resume = Resume(
    name="John Doe",
    email="johndoe@example.com",
    linkedin="https://linkedin.com/in/johndoe",
    phone="123-456-7890",
    github="https://github.com/johndoe",
    sections=[education_section, extracurricular_section, project_section, experience_section, skills_section]
)

print(resume.toLatex())
# resume.resumeToPdf()