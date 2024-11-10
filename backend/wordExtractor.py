from rake_nltk import Rake
import nltk

nltk.download('punkt_tab')
rake = Rake()

def extractPhrases(string):
    rake.extract_keywords_from_text(string)
    return rake.get_ranked_phrases_with_scores()

