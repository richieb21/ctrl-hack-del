from .Entry import Entry
from .Block import Block
import uuid  # Import uuid

class Section(Block):
    def __init__(self, entries):
        self.id = str(uuid.uuid4())  # Assign a unique ID to the section
        self.entries = entries  # List of Entry objects

    def toDict(self):
        return {
            "id": self.id,
            "title": self.get_title(),
            "items": [entry.toDict() for entry in self.entries]
        }

    def get_title(self):
        # Should be overridden in subclasses to return the section title
        return ""

    def toLatex(self):
        return "\n".join(map(lambda entry: entry.toLatex(), self.entries))

class EducationSection(Section):
    def __init__(self, schools):
        super().__init__(schools)

    def get_title(self):
        return "Education"

    def toDict(self):
        return super().toDict()

    def toLatex(self):
        ret = f"\\section{{Education}}\n\\resumeSubHeadingListStart\n" + super().toLatex() + " \\resumeSubHeadingListEnd"
        return ret

class ProjectsSection(Section):
    def __init__(self, projects):
        super().__init__(projects)

    def get_title(self):
        return "Projects"

    def toDict(self):
        return super().toDict()

    def toLatex(self):
        ret = f"\\section{{Projects}}\n\\resumeSubHeadingListStart\n" + super().toLatex() + " \\resumeSubHeadingListEnd"
        return ret

class ExperiencesSection(Section):
    def __init__(self, experiences):
        super().__init__(experiences)

    def get_title(self):
        return "Experience"

    def toDict(self):
        return super().toDict()

    def toLatex(self):
        ret = f"\\section{{Experiences}}\n\\resumeSubHeadingListStart\n" + super().toLatex() + " \\resumeSubHeadingListEnd"
        return ret

class SkillsSection(Section):
    def __init__(self, skills):
        super().__init__(skills)

    def get_title(self):
        return "Skills"

    def toDict(self):
        return super().toDict()

    def toLatex(self):
        ret = f"\\section{{Skills}}\n" + super().toLatex()
        return ret

class ExtracurricularSection(Section):
    def __init__(self, extracurriculars):
        super().__init__(extracurriculars)

    def get_title(self):
        return "Extracurriculars"

    def toDict(self):
        return super().toDict()

    def toLatex(self):
        ret = f"\\section{{Extracurriculars}}\n\\resumeSubHeadingListStart\n" + super().toLatex() + " \\resumeSubHeadingListEnd"
        return ret
