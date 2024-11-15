import re
import uuid
from .Block import Block

class Entry(Block):
    def __init__(self, title, subTitle, timeFrom, timeTo, location, subPoints=[]):
        self.id = str(uuid.uuid4())
        self.title = title
        self.subTitle = subTitle
        self.timeFrom = timeFrom
        self.timeTo = timeTo
        self.location = location
        self.subPoints = self.generate_subpoint_ids(subPoints)

    def generate_subpoint_ids(self, subPoints):
        return [{'id': str(uuid.uuid4()), 'text': point} for point in subPoints]

    def toDict(self):
        return {
            "id": self.id,
            "title": self.title,
            "subTitle": self.subTitle,
            "timeFrom": self.timeFrom,
            "timeTo": self.timeTo,
            "location": self.location,
            "subPoints": self.subPoints
        }

    def toLatex(self):
        # Apply escaping to all attributes that may contain special characters
        title = super().latex_escape(self.title)
        timeFrom = super().latex_escape(self.timeFrom)
        timeTo = super().latex_escape(self.timeTo)
        subTitle = super().latex_escape(self.subTitle)
        location = super().latex_escape(self.location)
        subPoints = [super().latex_escape(point['text']) for point in self.subPoints]

        # Create LaTeX string
        ret = f"""\n\t\\resumeSubheading{{{title}}}{{{timeFrom} -- {timeTo}}}{{{subTitle}}}{{{location}}}"""
        if subPoints:
            ret += "\n\t\\resumeItemListStart\n\t\t\t\\resumeItem{"
            ret += "}\n\t\t\t\\resumeItem{".join(subPoints)
            ret += "}\n\t\t\\resumeItemListEnd"
        return ret


class School(Entry):
    def __init__(self, title, subTitle, timeFrom, timeTo, location):
        super().__init__(title, subTitle, timeFrom, timeTo, location)

class Extracurricular(Entry):
    def __init__(self, title, subTitle, timeFrom, timeTo, location, subPoints=[]):
        super().__init__(title, subTitle, timeFrom, timeTo, location, subPoints)

class Project(Entry):
    def __init__(self, title, subTitle, timeFrom, timeTo, link, points):
        super().__init__(title, subTitle, timeFrom, timeTo, link, points)
        self.link = link

    def toDict(self):
        return {
            "id": self.id,
            "title": self.title,
            "subTitle": self.subTitle,
            "timeFrom": self.timeFrom,
            "timeTo": self.timeTo,
            "link": self.link,
            "subPoints": self.subPoints
        }

    def toLatex(self):
        title = super().latex_escape(self.title)
        timeFrom = super().latex_escape(self.timeFrom)
        timeTo = super().latex_escape(self.timeTo)
        subTitle = super().latex_escape(self.subTitle)
        link = super().latex_escape(self.link)

        subPoints = [super().latex_escape(point['text']) for point in self.subPoints]

        ret = f"""\n\t\\resumeSubheading{{{title}}}{{{timeFrom} -- {timeTo}}}{{{subTitle}}}{{\\href{{{link}}}{{\\underline{{View}}}}}}"""
        if subPoints:
            ret += "\n\t\\resumeItemListStart\n\t\t\t\\resumeItem{"
            ret += "}\n\t\t\t\\resumeItem{".join(subPoints)
            ret += "}\n\t\t\\resumeItemListEnd"
        return ret

class Experience(Entry):
    def __init__(self, title, subTitle, timeFrom, timeTo, location, points):
        super().__init__(title, subTitle, timeFrom, timeTo, location, points)

    def toDict(self):
        data = super().toDict()
        return data

class Skills(Entry):
    def __init__(self, languages, frameworks, devTools, other):
        self.id = str(uuid.uuid4())
        self.languages = languages
        self.frameworks = frameworks
        self.devTools = devTools
        self.other = other
        self.subPoints = [languages, frameworks, devTools, other]  # Store as subPoints for LaTeX generation

    def toDict(self):
        return {
            "id": self.id,
            "languages": self.languages,
            "frameworks": self.frameworks,
            "developer_tools": self.devTools,
            "other_skills": self.other
        }

    def toLatex(self):
        languageTex = ", ".join(self.languages)
        frameworkTex = ", ".join(self.frameworks)
        devToolTex = ", ".join(self.devTools)
        otherTex = ", ".join(self.other)
        
        ret = f"""\\begin{{itemize}}[leftmargin=0.15in, label={{}}]
        \\small{{\\item{{"""
        ret += f"\n\t\t\\textbf{{Languages}}: {languageTex} \\\\ \n\t\t\\textbf{{Frameworks}}: {frameworkTex} \\\\ \n\t\t\\textbf{{Developer Tools}}: {devToolTex} \\\\ \n\t\t\\textbf{{Other Skills}}: {otherTex}"
        ret += f"""}}}}
        \\end{{itemize}}"""
        return ret
