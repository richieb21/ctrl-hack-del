from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

def transformWords(setA, setB):
    A = model.encode(setA)
    B = model.encode(setB)

    similarity_matrix = util.cos_sim(A, B)

    best_matches = []
    for i, word in enumerate(setA):
        best_match_index = similarity_matrix[i].argmax().item()
        best_match_score = similarity_matrix[i][best_match_index].item()
        best_match_word = setB[best_match_index]
        
        best_matches.append((word, best_match_word, best_match_score))

    return best_matches