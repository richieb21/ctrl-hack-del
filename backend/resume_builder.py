from data_models.Entry import School, Project, Experience, Extracurricular, Skills
from data_models.Resume import Resume
from data_models.Section import SkillsSection, EducationSection, ExperiencesSection, ExtracurricularSection, ProjectsSection

def build_resume_from_profile(profile_data):
    sections = []
    
    # Build Education Section
    schools = []
    for edu in profile_data.get('education', []):
        if any([edu.get('program'), edu.get('schoolname')]):  # Only add if has content
            school = School(
                title=edu.get('program', ''),
                subTitle=edu.get('schoolname', ''),
                timeFrom=edu.get('start', ''),
                timeTo=edu.get('end', ''),
                location=f"GPA: {edu.get('gpa', '')}" if edu.get('gpa') else ''
            )
            schools.append(school)
    if schools:
        sections.append(EducationSection(schools))

    # Build Experience Section
    experiences = []
    for exp in profile_data.get('experiences', []):
        if any([exp.get('title'), exp.get('company')]):  # Only add if has content
            experience = Experience(
                title=exp.get('title', ''),
                subTitle=exp.get('company', ''),
                timeFrom=exp.get('date', '').split(' - ')[0] if ' - ' in exp.get('date', '') else '',
                timeTo=exp.get('date', '').split(' - ')[1] if ' - ' in exp.get('date', '') else exp.get('date', ''),
                location=exp.get('location', ''),
                points=exp.get('points', [])
            )
            experiences.append(experience)
    if experiences:
        sections.append(ExperiencesSection(experiences))

    # Build Projects Section
    projects = []
    for proj in profile_data.get('projects', []):
        if any([proj.get('name'), proj.get('description')]):  # Only add if has content
            project = Project(
                title=proj.get('name', ''),
                subTitle='',
                timeFrom=proj.get('date', ''),
                timeTo='',
                link=proj.get('link', ''),
                points=proj.get('description', [])
            )
            projects.append(project)
    if projects:
        sections.append(ProjectsSection(projects))

    # Build Extracurricular Section
    extracurriculars = []
    for extra in profile_data.get('extra_curricular', []):
        if any([extra.get('title'), extra.get('position')]):  # Only add if has content
            extracurricular = Extracurricular(
                title=extra.get('title', ''),
                subTitle=extra.get('position', ''),
                timeFrom=extra.get('date', '').split(' - ')[0] if ' - ' in extra.get('date', '') else '',
                timeTo=extra.get('date', '').split(' - ')[1] if ' - ' in extra.get('date', '') else extra.get('date', ''),
                location=extra.get('location', ''),
                subPoints=extra.get('points', [])
            )
            extracurriculars.append(extracurricular)
    if extracurriculars:
        sections.append(ExtracurricularSection(extracurriculars))

    # Build Skills Section
    skills_data = profile_data.get('skills', {})
    if any([
        skills_data.get('language'),
        skills_data.get('framework'),
        skills_data.get('tool'),
        skills_data.get('other')
    ]):
        skills = Skills(
            languages=skills_data.get('language', []),
            frameworks=skills_data.get('framework', []),
            devTools=skills_data.get('tool', []),
            other=skills_data.get('other', [])
        )
        sections.append(SkillsSection([skills]))

    # Create Resume
    links = profile_data.get('links', {})
    resume = Resume(
        name=profile_data.get('name', ''),
        email=links.get('email', ''),
        linkedin=links.get('linkedin_profile', ''),
        phone='',
        github=links.get('github_profile', ''),
        sections=sections  # Only include non-empty sections
    )

    return resume