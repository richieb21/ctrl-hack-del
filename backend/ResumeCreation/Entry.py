from abc import ABC, abstractmethod
import Point
import re

def latex_escape(text):
    # Dictionary of special characters and their escaped versions
        escape_chars = {
            '%': r'\%',
            '$': r'\$',
            '&': r'\&',
            '#': r'\#',
            '_': r'\_',
            '{': r'\{',
            '}': r'\}',
            '~': r'\textasciitilde{}',
            '^': r'\textasciicircum{}',
            '\\': r'\textbackslash{}'
        }
        # Replace each special character with its escaped version
        return re.sub('|'.join(re.escape(key) for key in escape_chars.keys()),
                    lambda k: escape_chars[k.group(0)], text)

class Entry(ABC):
    def __init__(self, title, subTitle, timeFrom, timeTo, location, subPoints=[]):
        self.title = title
        self.subTitle = subTitle
        self.timeFrom = timeFrom
        self.timeTo = timeTo
        self.location = location
        self.subPoints = subPoints

    

    def toLatex(self):
        # Apply escaping to all attributes that may contain special characters
        title = latex_escape(self.title)
        timeFrom = latex_escape(self.timeFrom)
        timeTo = latex_escape(self.timeTo)
        subTitle = latex_escape(self.subTitle)
        location = latex_escape(self.location)
        subPoints = [latex_escape(point) for point in self.subPoints] if self.subPoints else []

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


class Experience(Entry):
    def __init__(self, title, subTitle, timeFrom, timeTo, location, points):
        super().__init__(title, subTitle, timeFrom, timeTo, location, points)

class Skills(Entry):
    def __init__(self, languages, frameworks, devTools, other):
        self.subPoints = [languages,frameworks,devTools, other]

    def toLatex(self):
        languageTex = ", ".join(self.subPoints[0])
        frameworkTex = ", ".join(self.subPoints[1])
        devToolTex = ", ".join(self.subPoints[2])
        otherTex = ", ".join(self.subPoints[3])
        ret = f"""\\begin{{itemize}}[leftmargin=0.15in, label={{}}]
        \\small{{\\item{{"""
        ret += f"\n\t\t\\textbf{{Languages}}: {languageTex} \\\\ \n\t\t\\textbf{{Frameworks}}: {frameworkTex} \\\\ \n\t\t\\textbf{{Developer Tools}}: {devToolTex} \\\\ \n\t\t\\textbf{{Other Skills}}: {otherTex}"
        ret += f"""}}}}
        \\end{{itemize}}"""
        return ret

