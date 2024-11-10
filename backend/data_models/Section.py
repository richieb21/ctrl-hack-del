import Entry
from Block import Block

class Section(Block):
    def __init__(self, entries:Entry):
        self.entries = entries # List of Entry objects

    def toDict(self):
        return [entry.toDict() for entry in self.entries]

    def toLatex(self):
        return "\n".join(map(lambda entry: entry.toLatex(), self.entries))

class EducationSection(Section):
    def __init__(self, schools):
        super().__init__(schools)

    def toLatex(self):
        ret = f"\\section{{Education}}\n\\resumeSubHeadingListStart\n" + super().toLatex() + " \\resumeSubHeadingListEnd"
        return ret
    
    def toDict(self):
        return {
            "Education" : super().toDict()
        }

class ProjectsSection(Section):
    def __init__(self, projects):
        super().__init__(projects)

    def toDict(self):
        return {
            "Projects" : super().toDict()
        }
    
    def toLatex(self):
        ret = f"\\section{{Projects}}\n\\resumeSubHeadingListStart\n" + super().toLatex() + " \\resumeSubHeadingListEnd"
        return ret

class ExperiencesSection(Section):
    def __init__(self, experiences):
        super().__init__(experiences)

    def toLatex(self):
        ret = f"\\section{{Experiences}}\n\\resumeSubHeadingListStart\n" + super().toLatex() + " \\resumeSubHeadingListEnd"
        return ret
    
    def toDict(self):
        return {
            "Experiences" : super().toDict()
        }

class SkillsSection(Section):
    def __init__(self, skills):
        super().__init__(skills)

    def toLatex(self):
        ret = f"\\section{{Skills}}\n" + super().toLatex()
        return ret

    def toDict(self):
        return {
            "Skills" : super().toDict()
        }

class ExtracurricularSection(Section):
    def __init__(self, extracurriculars):
        super().__init__(extracurriculars)

    def toLatex(self):
        ret = f"\\section{{Extracurriculars}}\n\\resumeSubHeadingListStart\n" + super().toLatex() + " \\resumeSubHeadingListEnd"
        return ret

    def toDict(self):
        return {
            "Extracurriculars" : super().toDict()
        }
    
