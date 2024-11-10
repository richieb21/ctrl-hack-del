from .Section import Section
from latex import build_pdf
import io
from .Block import Block

class Resume(Block):
    def __init__(self, name, email, linkedin, phone, github, sections):
        self.name = name
        self.email = email
        self.linkedin = linkedin
        self.phone = phone
        self.github = github
        self.sections = sections

    def toDict(self):
        return {
            "name": self.name,
            "email": self.email,
            "linkedin": self.linkedin,
            "phone": self.phone,
            "github": self.github,
            "sections": [section.toDict() for section in self.sections]
        }

    def resumeToPdf(self):
        output_pdf_name = f"resume-{self.name.replace(' ', '')}.pdf"
        temp_tex_file = "temp.tex"
        latex_code = self.toLatex()

        pdf = build_pdf(latex_code)
        
        pdf_data = bytes(pdf)

        with open("example.pdf", "wb") as f:
            f.write(pdf_data)

        print(f"Generated PDF for {self.name} at {output_pdf_name}")
    
        # doc.append(NoEscape(self.toLatex()))
        # doc.generate_pdf(output_pdf_name, clean_tex=False)

        # # Write LaTeX content to a temporary .tex file
        # with open(temp_tex_file, "w") as tex_file:
        #     tex_file.write(self.toLatex())

        # # Use PDFLaTeX to create a PDF from the .tex file
        # pdfl = PDFLaTeX.from_texfile(temp_tex_file)
        # pdf, log, completed_process = pdfl.create_pdf(keep_pdf_file=True, keep_log_file=True)

        # # Save the generated PDF to the output file with a dynamic name
        # with open(output_pdf_name, "wb") as output_pdf:
        #     output_pdf.write(pdf)

        # # Clean up the temporary .tex file
        # os.remove(temp_tex_file)

    def toLatex(self) -> str:
        ret = f"""\\documentclass[letterpaper,11pt]{{article}}

\\usepackage{{latexsym}}
\\usepackage[empty]{{fullpage}}
\\usepackage{{titlesec}}
\\usepackage{{marvosym}}
\\usepackage[usenames,dvipsnames]{{color}}
\\usepackage{{verbatim}}
\\usepackage{{enumitem}}
\\usepackage[hidelinks]{{hyperref}}
\\usepackage{{fancyhdr}}
\\usepackage[english]{{babel}}
\\usepackage{{tabularx}}
\\input{{glyphtounicode}}

\\pagestyle{{fancy}}
\\fancyhf{{}} 
\\fancyfoot{{}}
\\renewcommand{{\\headrulewidth}}{{0pt}}
\\renewcommand{{\\footrulewidth}}{{0pt}}

\\addtolength{{\\oddsidemargin}}{{-0.5in}}
\\addtolength{{\\evensidemargin}}{{-0.5in}}
\\addtolength{{\\textwidth}}{{1in}}
\\addtolength{{\\topmargin}}{{-.5in}}
\\addtolength{{\\textheight}}{{1.0in}}

\\urlstyle{{same}}

\\raggedbottom
\\raggedright
\\setlength{{\\tabcolsep}}{{0in}}

\\titleformat{{\\section}}{{\\vspace{{-4pt}}\\scshape\\raggedright\\large}}{{}}{{0em}}{{}}[\\color{{black}}\\titlerule \\vspace{{-5pt}}]

\\pdfgentounicode=1

\\newcommand{{\\resumeItem}}[1]{{\\item\\small{{#1 \\vspace{{-2pt}}}}}}

\\newcommand{{\\resumeSubheading}}[4]{{
  \\vspace{{-2pt}}\\item
    \\begin{{tabular*}}{{0.97\\textwidth}}[t]{{l@{{\\extracolsep{{\\fill}}}}r}}
      \\textbf{{#1}} & #2 \\\\
      \\textit{{\\small#3}} & \\textit{{\\small #4}} \\\\
    \\end{{tabular*}}\\vspace{{-7pt}}
}}

\\newcommand{{\\resumeSubSubheading}}[2]{{
    \\item
    \\begin{{tabular*}}{{0.97\\textwidth}}{{l@{{\\extracolsep{{\\fill}}}}r}}
      \\textit{{\\small#1}} & \\textit{{\\small #2}} \\\\
    \\end{{tabular*}}\\vspace{{-7pt}}
}}

\\newcommand{{\\resumeProjectHeading}}[2]{{
    \\item
    \\begin{{tabular*}}{{0.97\\textwidth}}{{l@{{\\extracolsep{{\\fill}}}}r}}
      \\small#1 & #2 \\\\
    \\end{{tabular*}}\\vspace{{-7pt}}
}}

\\newcommand{{\\resumeSubItem}}[1]{{\\resumeItem{{#1}}\\vspace{{-4pt}}}}

\\renewcommand\\labelitemii{{$\\vcenter{{\\hbox{{\\tiny$\\bullet$}}}}$}}

\\newcommand{{\\resumeSubHeadingListStart}}{{\\begin{{itemize}}[leftmargin=0.15in, label={{}}]}}
\\newcommand{{\\resumeSubHeadingListEnd}}{{\\end{{itemize}}}}
\\newcommand{{\\resumeItemListStart}}{{\\begin{{itemize}}}}
\\newcommand{{\\resumeItemListEnd}}{{\\end{{itemize}}\\vspace{{-5pt}}}}

\\begin{{document}}

\\begin{{center}}
    \\textbf{{\\Huge \\scshape {self.name}}} \\\\ \\vspace{{1pt}}
    \\small {self.phone} $|$ \\href{{mailto:{self.email}}}{{\\underline{{{self.email}}}}} $|$ 
    \\href{{{self.linkedin}}}{{\\underline{{{self.linkedin}}}}} $|$
    \\href{{{self.github}}}{{\\underline{{{self.github}}}}}
\\end{{center}}
"""

        for section in self.sections:
            ret += section.toLatex()

        ret += "\\end{document}"
        
        return ret
