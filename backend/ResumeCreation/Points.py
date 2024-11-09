from abc import ABC, abstractmethod

class Points(ABC):
    def __init__(self, description):
        self.description = description  # Description of the point

    @abstractmethod
    def display(self):
        """Display the point."""
        pass
