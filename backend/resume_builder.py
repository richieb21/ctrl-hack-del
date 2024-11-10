from data_models.Entry import School, Project, Experience, Extracurricular, Skills
from data_models.Resume import Resume
from data_models.Section import SkillsSection, EducationSection, ExperiencesSection, ExtracurricularSection, ProjectsSection

def build_resume_from_profile(profile_data):
    # Build Education Section
    schools = []
    for edu in profile_data.get('education', []):
        school = School(
            title=edu.get('program', ''),
            subTitle=edu.get('schoolname', ''),
            timeFrom=edu.get('start', ''),
            timeTo=edu.get('end', ''),
            location=f"GPA: {edu.get('gpa', '')}" if edu.get('gpa') else ''
        )
        schools.append(school)
    education_section = EducationSection(schools)

    # Build Experience Section
    experiences = []
    for exp in profile_data.get('experiences', []):
        experience = Experience(
            title=exp.get('title', ''),
            subTitle=exp.get('position', ''),
            timeFrom=exp.get('date', '').split(' - ')[0] if ' - ' in exp.get('date', '') else '',
            timeTo=exp.get('date', '').split(' - ')[1] if ' - ' in exp.get('date', '') else exp.get('date', ''),
            location=exp.get('location', ''),
            points=exp.get('points', [])
        )
        experiences.append(experience)
    experience_section = ExperiencesSection(experiences)

    # Build Projects Section
    projects = []
    for proj in profile_data.get('projects', []):
        project = Project(
            title=proj.get('name', ''),
            subTitle='',
            timeFrom=proj.get('date', '').split(' - ')[0] if ' - ' in proj.get('date', '') else '',
            timeTo=proj.get('date', '').split(' - ')[1] if ' - ' in proj.get('date', '') else proj.get('date', ''),
            link=proj.get('link', ''),
            points=proj.get('description', [])
        )
        projects.append(project)
    project_section = ProjectsSection(projects)

    # Build Extracurricular Section
    extracurriculars = []
    for extra in profile_data.get('extra_curricular', []):
        extracurricular = Extracurricular(
            title=extra.get('title', ''),
            subTitle=extra.get('position', ''),
            timeFrom=extra.get('date', '').split(' - ')[0] if ' - ' in extra.get('date', '') else '',
            timeTo=extra.get('date', '').split(' - ')[1] if ' - ' in extra.get('date', '') else extra.get('date', ''),
            location=extra.get('location', ''),
            subPoints=extra.get('points', [])
        )
        extracurriculars.append(extracurricular)
    extracurricular_section = ExtracurricularSection(extracurriculars)

    # Build Skills Section
    skills_data = profile_data.get('skills', {})
    skills = Skills(
        languages=skills_data.get('language', []),
        frameworks=skills_data.get('framework', []),
        devTools=skills_data.get('tool', []),
        other=skills_data.get('other', [])
    )
    skills_section = SkillsSection([skills])

    # Create Resume
    links = profile_data.get('links', {})
    resume = Resume(
        name=profile_data.get('name', ''),
        email=links.get('email', ''),
        linkedin=links.get('linkedin_profile', ''),
        phone='',  # Add phone number if available in profile
        github=links.get('github_profile', ''),
        sections=[education_section, experience_section, project_section, extracurricular_section, skills_section]
    )

    return resume