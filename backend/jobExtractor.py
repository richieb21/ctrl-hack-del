from rake_nltk import Rake
import nltk

nltk.download('punkt_tab')
rake = Rake()

def extractWords(string):
    rake.extract_keywords_from_sentences(string)
    return rake.get_ranked_phrases_with_scores()

def extractPhrases(string):
    rake.extract_keywords_from_text(string)
    return rake.get_ranked_phrases_with_scores()



text = """\nAssist with backend development projects using Java and Spring framework\nAssist with frontend development projects using Typescript and React\nBuilding and running automated programs to perform mass testing of eHealth tools (Python, Java, Selenium)\nTroubleshooting bugs in software, provide suggestions for solutions, general system testing\nWork with vendors/collaborators to resolve issues and ensure the project's goals are met\nDocumenting/logging system bugs in eHealth tools using ticketing and project management software (Asana)\nMaintaining and creating documentation on Notion\nAssisting with implementation and roll out of eHealth tools in primary care settings as part of a quality improvement and/or research projects\nSkills in being an intermediary between pure technology developers and clinicians",
"Required Skills": "Desired Skills:\nDesire and willingness to learn new skills and technologies\nAbility to adapt to a fast-paced work environment\nCritical thinking skills - an ability to troubleshoot and problem solve issues that arise\nEffective oral/written communication, and ability to work well individually and with others\nData management skills, and a keen attention to detail\nExperience working with Java/Spring, REST APIs, GraphQL\nExperience working with Typescript, NestJS, Javascript (React), Python\nExperience with AWS\nExperience working with large projects on GitHub\nKnowledge of MS Office Suite (including Excel Macros)
As a Fullstack Developer, you'll be responsible for implementing new features, fixing bugs, and improving the experience of those using our platforms. You will work independently, receiving feedback and guiding the direction of development yourself. You will have a lot of freedom to contribute where it matters most, and develop software that immediately and directly benefits those working with you.",
"Required Skills": "You *must* have:\nExperience working with Javascript & HTML.\nExperience with at least one frontend framework.\nExperience working with and developing APIs.\nExperience with a strongly typed or low-level programming language (Golang,C,C++,Rust,C#,Ruby,Java... anything more foundational than Python and Javascript)\nExperience with Git.\nExceptional ability to work independently.\nInitiative to solve problems and an eye for optimization.\nStrong communication skills.\nExperience with any of the following is an *asset*:\nReact (our frontend is written in React)\nDocker (all of our code is deployed with Docker)\nGolang (our backend is written in Go)\nMongoDB (we use MongoDB as a database)\nPython (we have a few Python scripts, this isn't as important)\nTailwindCSS, Figma, and/or design\nAn interest in linguistics is a bonus","""

phrases = extractPhrases(text)
print(phrases)

# print("Words")
# print(extractWords(text))