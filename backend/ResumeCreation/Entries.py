from abc import ABC, abstractmethod

class Entries(ABC):
    def __init__(self, points):
        self.points = points  # List of Points objects

    @abstractmethod
    def add_point(self, point):
        """Add a point to the entry."""
        pass

    @abstractmethod
    def display(self):
        """Display the entry and its points."""
        pass
