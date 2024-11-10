from rake_nltk import Rake
import nltk

nltk.download('punkt_tab')
nltk.download('punkt')
nltk.download('stopwords')
rake = Rake()

def extractPhrases(string):
    rake.extract_keywords_from_text(string)
    return rake.get_ranked_phrases_with_scores()

