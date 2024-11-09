from abc import ABC, abstractmethod
from pdflatex import PDFLaTeX


class Resume(ABC):
    def __init__(self, sections):
        self.sections = sections  # List of Headers objects

    @abstractmethod
    def add_section(self, section):
        """Add a section to the resume."""
        pass

    @abstractmethod
    def display(self):
        """Display the entire resume with all sections and entries."""
        pass

            