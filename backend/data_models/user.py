from bson import ObjectId

class User:
    def __init__(self, user_id, username, email, created_at, linkedin_profile=None, github_profile=None, phone_number=None, skills=None, experiences=None, education=None, generated_resumes=None):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.created_at = created_at
        
        self.linkedin_profile = linkedin_profile
        self.github_profile = github_profile
        self.phone_number = phone_number
        self.skills = skills if skills is not None else []
        self.experiences = experiences if experiences is not None else []
        self.education = education if education is not None else []
        self.generated_resumes = generated_resumes if generated_resumes is not None else []

    @classmethod
    def from_mongo(cls, user_data, profile_data):
        return cls(
            user_id=user_data.get("_id"),
            username=user_data.get("username"),
            email=user_data.get("email"),
            created_at=user_data.get("created_at"),
            linkedin_profile=profile_data.get("linkedin_profile"),
            github_profile=profile_data.get("github_profile"),
            phone_number=profile_data.get("phone_number"),
            skills=profile_data.get("skills", []),
            experiences=profile_data.get("experiences", []),
            education=profile_data.get("education", []),
            generated_resumes=profile_data.get("generated_resumes", [])
        )

    def __repr__(self):
        return f"<User {self.username} ({self.email})>"
