from nltk.corpus import words


def create_word_list():
    all_words = words.words()

    all_five_char_words = [word.lower().strip() for word in all_words if len(word) == 5]

    # Remove duplicates
    unique_five_char_words = sorted(list(set(all_five_char_words)))

    return unique_five_char_words