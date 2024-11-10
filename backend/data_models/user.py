class User:
    def __init__(self, user_id, username, email, created_at, linkedin_profile=None, github_profile=None, phone_number=None, skills=None, experiences=None, education=None, projects=None, extra_curricular=None, generated_resumes=None):
        self.user_id = user_id
        self.username = username or ""
        self.email = email or ""
        self.created_at = created_at
        self.linkedin_profile = linkedin_profile or ""
        self.github_profile = github_profile or ""
        self.phone_number = phone_number or ""
        self.skills = skills if isinstance(skills, dict) else {"language": [], "framework": [], "tool": [], "other": []}
        self.experiences = experiences or []
        self.education = education or []
        self.projects = projects or []
        self.extra_curricular = extra_curricular or []
        self.generated_resumes = generated_resumes or []

    @classmethod
    def from_mongo(cls, user_data, profile_data):
        # Get links from profile data
        links = profile_data.get('links', {})
        
        return cls(
            user_id=user_data.get("_id"),
            username=user_data.get("username", ""),
            email=user_data.get("email", ""),
            created_at=user_data.get("created_at"),
            linkedin_profile=links.get("linkedin_profile", ""),
            github_profile=links.get("github_profile", ""),
            phone_number=profile_data.get("phone_number", ""),
            skills=profile_data.get("skills", {"language": [], "framework": [], "tool": [], "other": []}),
            experiences=profile_data.get("experiences", []),
            education=profile_data.get("education", []),
            projects=profile_data.get("projects", []),
            extra_curricular=profile_data.get("extra_curricular", []),
            generated_resumes=profile_data.get("generated_resumes", [])
        )

    def __repr__(self):
        return f"<User {self.username} ({self.email})>"
