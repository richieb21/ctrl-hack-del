from abc import ABC, abstractmethod

class Headers(ABC):
    def __init__(self, entries, points):
        self.entries = entries  # List of Entries objects
        self.points = points  # List of Points objects

    @abstractmethod
    def add_entry(self, entry):
        self.entries.append(entry)
        pass

    @abstractmethod
    def display(self):
        """Display the header section and its entries."""
        pass

class Experiences(Headers):
    pass


class Education(Headers):
    pass


class Projects(Headers):
    pass


class Skills(Headers):
    pass



